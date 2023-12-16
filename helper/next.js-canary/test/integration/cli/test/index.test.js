/* eslint-env jest */

import {
  check,
  findPort,
  killApp,
  launchApp,
  nextBuild,
  runNextCommand,
  runNextCommandDev,
} from 'next-test-utils'
import fs from 'fs-extra'
import path, { join } from 'path'
import pkg from 'next/package'
import http from 'http'
import stripAnsi from 'strip-ansi'

const dirBasic = join(__dirname, '../basic')
const dirDuplicateSass = join(__dirname, '../duplicate-sass')

const runAndCaptureOutput = async ({ port }) => {
  let stdout = ''
  let stderr = ''

  let app = http.createServer((_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('OK')
  })

  await new Promise((resolve, reject) => {
    app.on('error', reject)
    app.on('listening', () => resolve())
    app.listen(port)
  })

  await launchApp(dirBasic, port, {
    stdout: true,
    stderr: true,
    onStdout(msg) {
      stdout += msg
    },
    onStderr(msg) {
      stderr += msg
    },
  })

  await new Promise((resolve) => app.close(resolve))

  return { stdout, stderr }
}

const testExitSignal = async (
  killSignal = '',
  args = [],
  readyRegex = /Creating an optimized production/
) => {
  let instance
  const killSigint = (inst) => {
    instance = inst
  }
  let output = ''

  let cmdPromise = runNextCommand(args, {
    ignoreFail: true,
    instance: killSigint,
    onStdout: (msg) => {
      output += stripAnsi(msg)
    },
  }).catch((err) => expect.fail(err.message))

  await check(() => output, readyRegex)
  instance.kill(killSignal)

  const { code, signal } = await cmdPromise
  // Node can only partially emulate signals on Windows. Our signal handlers won't affect the exit code.
  // See: https://nodejs.org/api/process.html#process_signal_events
  const expectedExitSignal = process.platform === `win32` ? killSignal : null
  expect(signal).toBe(expectedExitSignal)
  expect(code).toBe(0)
}

describe('CLI Usage', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    describe('start', () => {
      test('should exit when SIGINT is signalled', async () => {
        require('console').log('before build')
        await fs.remove(join(dirBasic, '.next'))
        await nextBuild(dirBasic, undefined, {
          onStdout(msg) {
            console.log(msg)
          },
          onStderr(msg) {
            console.log(msg)
          },
        })
        require('console').log('build finished')

        const port = await findPort()
        await testExitSignal(
          'SIGINT',
          ['start', dirBasic, '-p', port],
          /- Local:/
        )
      })
      test('should exit when SIGTERM is signalled', async () => {
        await fs.remove(join(dirBasic, '.next'))
        await nextBuild(dirBasic, undefined, {
          onStdout(msg) {
            console.log(msg)
          },
          onStderr(msg) {
            console.log(msg)
          },
        })
        const port = await findPort()
        await testExitSignal(
          'SIGTERM',
          ['start', dirBasic, '-p', port],
          /- Local:/
        )
      })

      test('--help', async () => {
        const help = await runNextCommand(['start', '--help'], {
          stdout: true,
        })
        expect(help.stdout).toMatch(/Starts the application in production mode/)
      })

      test('-h', async () => {
        const help = await runNextCommand(['start', '-h'], {
          stdout: true,
        })
        expect(help.stdout).toMatch(/Starts the application in production mode/)
      })

      test('should format IPv6 addresses correctly', async () => {
        await nextBuild(dirBasic)
        const port = await findPort()

        let stdout = ''
        const app = await runNextCommandDev(
          ['start', dirBasic, '--hostname', '::', '--port', port],
          undefined,
          {
            nextStart: true,
            onStdout(msg) {
              stdout += msg
            },
          }
        )

        try {
          await check(() => {
            // Only display when hostname is provided
            expect(stdout).toMatch(
              new RegExp(`Network:\\s*http://\\[::\\]:${port}`)
            )
            expect(stdout).toMatch(new RegExp(`http://\\[::1\\]:${port}`))
          })
        } finally {
          await killApp(app)
        }
      })

      test('should warn when unknown argument provided', async () => {
        const { stderr } = await runNextCommand(['start', '--random'], {
          stderr: true,
        })
        expect(stderr).toEqual('Unknown or unexpected option: --random\n')
      })
      test('should not throw UnhandledPromiseRejectionWarning', async () => {
        const { stderr } = await runNextCommand(['start', '--random'], {
          stderr: true,
        })
        expect(stderr).not.toContain('UnhandledPromiseRejectionWarning')
      })

      test('duplicate sass deps', async () => {
        const port = await findPort()

        let stderr = ''
        let instance = await launchApp(dirDuplicateSass, port, {
          stderr: true,
          onStderr(msg) {
            stderr += msg
          },
        })

        try {
          await check(() => stderr, /both `sass` and `node-sass` installed/)
        } finally {
          await killApp(instance).catch(() => {})
        }
      })

      test('invalid directory', async () => {
        const output = await runNextCommand(['start', 'non-existent'], {
          stderr: true,
        })
        expect(output.stderr).toContain(
          'Invalid project directory provided, no such directory'
        )
      })

      test('--keepAliveTimeout string arg', async () => {
        const { stderr } = await runNextCommand(
          ['start', '--keepAliveTimeout', 'string'],
          {
            stderr: true,
          }
        )
        expect(stderr).toContain(
          'Invalid --keepAliveTimeout, expected a non negative number but received "NaN"'
        )
      })

      test('--keepAliveTimeout negative number', async () => {
        const { stderr } = await runNextCommand(
          ['start', '--keepAliveTimeout=-100'],
          {
            stderr: true,
          }
        )
        expect(stderr).toContain(
          'Invalid --keepAliveTimeout, expected a non negative number but received "-100"'
        )
      })

      test('--keepAliveTimeout Infinity', async () => {
        const { stderr } = await runNextCommand(
          ['start', '--keepAliveTimeout', 'Infinity'],
          {
            stderr: true,
          }
        )
        expect(stderr).toContain(
          'Invalid --keepAliveTimeout, expected a non negative number but received "Infinity"'
        )
      })

      test('--keepAliveTimeout happy path', async () => {
        const { stderr } = await runNextCommand(
          ['start', '--keepAliveTimeout', '100'],
          {
            stderr: true,
          }
        )
        expect(stderr).not.toContain(
          'Invalid keep alive timeout provided, expected a non negative number'
        )
      })

      test('should not start on a port out of range', async () => {
        const invalidPort = '300001'
        const { stderr } = await runNextCommand(
          ['start', '--port', invalidPort],
          {
            stderr: true,
          }
        )

        expect(stderr).toContain(`options.port should be >= 0 and < 65536.`)
      })

      test('should not start on a reserved port', async () => {
        const reservedPort = '4045'
        const { stderr } = await runNextCommand(
          ['start', '--port', reservedPort],
          {
            stderr: true,
          }
        )

        expect(stderr).toContain(
          `Bad port: "${reservedPort}" is reserved for npp`
        )
      })
    })

    describe('telemetry', () => {
      test('--help', async () => {
        const help = await runNextCommand(['telemetry', '--help'], {
          stdout: true,
        })
        expect(help.stdout).toMatch(
          /Allows you to control Next\.js' telemetry collection/
        )
      })

      test('-h', async () => {
        const help = await runNextCommand(['telemetry', '-h'], {
          stdout: true,
        })
        expect(help.stdout).toMatch(
          /Allows you to control Next\.js' telemetry collection/
        )
      })

      test('should warn when unknown argument provided', async () => {
        const { stderr } = await runNextCommand(['telemetry', '--random'], {
          stderr: true,
        })
        expect(stderr).toEqual('Unknown or unexpected option: --random\n')
      })
      test('should not throw UnhandledPromiseRejectionWarning', async () => {
        const { stderr } = await runNextCommand(['telemetry', '--random'], {
          stderr: true,
        })
        expect(stderr).not.toContain('UnhandledPromiseRejectionWarning')
      })
    })

    describe('build', () => {
      test('--help', async () => {
        const help = await runNextCommand(['build', '--help'], {
          stdout: true,
        })
        expect(help.stdout).toMatch(
          /Compiles the application for production deployment/
        )
      })

      test('-h', async () => {
        const help = await runNextCommand(['build', '-h'], {
          stdout: true,
        })
        expect(help.stdout).toMatch(
          /Compiles the application for production deployment/
        )
      })

      test('should warn when unknown argument provided', async () => {
        const { stderr } = await runNextCommand(['build', '--random'], {
          stderr: true,
        })
        expect(stderr).toEqual('Unknown or unexpected option: --random\n')
      })
      test('should not throw UnhandledPromiseRejectionWarning', async () => {
        const { stderr } = await runNextCommand(['build', '--random'], {
          stderr: true,
        })
        expect(stderr).not.toContain('UnhandledPromiseRejectionWarning')
      })

      test('should exit when SIGINT is signalled', async () => {
        await testExitSignal('SIGINT', ['build', dirBasic])
      })

      test('should exit when SIGTERM is signalled', async () => {
        await testExitSignal('SIGTERM', ['build', dirBasic])
      })

      test('invalid directory', async () => {
        const output = await runNextCommand(['build', 'non-existent'], {
          stderr: true,
        })
        expect(output.stderr).toContain(
          'Invalid project directory provided, no such directory'
        )
      })
    })
  })

  describe('no command', () => {
    test('--help', async () => {
      const help = await runNextCommand(['--help'], {
        stdout: true,
      })
      expect(help.stdout).toMatch(/Usage/)
    })

    test('-h', async () => {
      const help = await runNextCommand(['-h'], {
        stdout: true,
      })
      expect(help.stdout).toMatch(/Usage/)
    })

    test('--version', async () => {
      const output = await runNextCommand(['--version'], {
        stdout: true,
      })
      expect(output.stdout).toMatch(
        new RegExp(`Next\\.js v${pkg.version.replace(/\./g, '\\.')}`)
      )
    })

    test('-v', async () => {
      const output = await runNextCommand(['--version'], {
        stdout: true,
      })
      expect(output.stdout).toMatch(
        new RegExp(`Next\\.js v${pkg.version.replace(/\./g, '\\.')}`)
      )
    })

    test('invalid directory', async () => {
      const output = await runNextCommand(['non-existent'], {
        stderr: true,
      })
      expect(output.stderr).toContain(
        'Invalid project directory provided, no such directory'
      )
    })

    test('detects command typos', async () => {
      const typos = [
        ['buidl', 'build'],
        ['buill', 'build'],
        ['biild', 'build'],
        ['starr', 'start'],
        ['dee', 'dev'],
      ]

      for (const check of typos) {
        const output = await runNextCommand([check[0]], {
          stderr: true,
        })
        expect(output.stderr).toContain(
          `"next ${check[0]}" does not exist. Did you mean "next ${check[1]}"?`
        )
      }
    })
  })

  describe('dev', () => {
    test('--help', async () => {
      const help = await runNextCommand(['dev', '--help'], {
        stdout: true,
      })
      expect(help.stdout).toMatch(/Starts the application in development mode/)
    })

    test('-h', async () => {
      const help = await runNextCommand(['dev', '-h'], {
        stdout: true,
      })
      expect(help.stdout).toMatch(/Starts the application in development mode/)
    })

    test('custom directory', async () => {
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [dirBasic, '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        await check(() => output, /- Local:/i)
      } finally {
        await killApp(app)
      }
    })

    test('--port', async () => {
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [dirBasic, '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        await check(() => output, new RegExp(`http://localhost:${port}`))
      } finally {
        await killApp(app)
      }
    })

    test('--port 0', async () => {
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [dirBasic, '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        await check(() => output, new RegExp(`http://localhost:${port}`))
      } finally {
        await killApp(app)
      }
      const matches = /- Local/.exec(output)
      expect(matches).not.toBe(null)

      const _port = parseInt(matches[1])
      // Regression test: port 0 was interpreted as if no port had been
      // provided, falling back to 3000.
      expect(_port).not.toBe(3000)
    })

    test('PORT=0', async () => {
      let output = ''
      const app = await runNextCommandDev([dirBasic], undefined, {
        env: {
          PORT: 0,
        },
        onStdout(msg) {
          output += stripAnsi(msg)
        },
      })
      try {
        await check(() => output, /- Local:/)
        // without --hostname, do not log Network: xxx
        const matches = /Network:\s*http:\/\/\[::\]:(\d+)/.exec(output)
        const _port = parseInt(matches)
        expect(matches).toBe(null)
        // Regression test: port 0 was interpreted as if no port had been
        // provided, falling back to 3000.
        expect(_port).not.toBe(3000)
      } finally {
        await killApp(app)
      }
    })

    test("NODE_OPTIONS='--inspect'", async () => {
      const port = await findPort()
      let output = ''
      let errOutput = ''
      const app = await runNextCommandDev(
        [dirBasic, '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
          onStderr(msg) {
            errOutput += stripAnsi(msg)
          },
          env: { NODE_OPTIONS: '--inspect' },
        }
      )
      try {
        await check(() => output, new RegExp(`http://localhost:${port}`))
        await check(() => errOutput, /Debugger listening on/)
        expect(errOutput).not.toContain('address already in use')
        expect(output).toContain(
          'the --inspect option was detected, the Next.js router server should be inspected at port'
        )
      } finally {
        await killApp(app)
      }
    })

    test('-p', async () => {
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev([dirBasic, '-p', port], undefined, {
        onStdout(msg) {
          output += stripAnsi(msg)
        },
        env: { NODE_OPTIONS: '--inspect' },
      })
      try {
        await check(() => output, new RegExp(`http://localhost:${port}`))
      } finally {
        await killApp(app)
      }
    })

    test('-p conflict', async () => {
      const port = await findPort()
      const { stderr, stdout } = await runAndCaptureOutput({ port })

      expect(stderr).toMatch('already in use')
      expect(stdout).not.toMatch(/ready/i)
      expect(stdout).not.toMatch('started')
      expect(stdout).not.toMatch(`${port}`)
      expect(stripAnsi(stdout).trim()).toBeFalsy()
    })

    test('-p reserved', async () => {
      const TCP_MUX_PORT = 1
      const { stderr, stdout } = await runAndCaptureOutput({
        port: TCP_MUX_PORT,
      })

      expect(stdout).toMatch('')
      expect(stderr).toMatch(
        `Bad port: "${TCP_MUX_PORT}" is reserved for tcpmux`
      )
    })

    test('--hostname', async () => {
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [dirBasic, '--hostname', '0.0.0.0', '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        await check(
          () => output,
          new RegExp(`Network:\\s*http://0.0.0.0:${port}`)
        )
        await check(() => output, new RegExp(`http://localhost:${port}`))
      } finally {
        await killApp(app)
      }
    })

    test('-H', async () => {
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [dirBasic, '-H', '0.0.0.0', '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        await check(
          () => output,
          new RegExp(`Network:\\s*http://0.0.0.0:${port}`)
        )
        await check(() => output, new RegExp(`http://localhost:${port}`))
      } finally {
        await killApp(app)
      }
    })

    // only runs on CI as it requires administrator privileges
    test('--experimental-https', async () => {
      if (!process.env.CI) {
        console.warn(
          '--experimental-https only runs on CI as it requires administrator privileges'
        )

        return
      }

      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [dirBasic, '--experimental-https', '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        await check(() => output, /Network:\s*http:\/\/\[::\]:(\d+)/)
        await check(() => output, /https:\/\/localhost:(\d+)/)
        await check(() => output, /Certificates created in/)
      } finally {
        await killApp(app)
      }
    })

    test('--experimental-https with provided key/cert', async () => {
      const keyFile = path.resolve(
        __dirname,
        '../certificates/localhost-key.pem'
      )
      const certFile = path.resolve(__dirname, '../certificates/localhost.pem')
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [
          dirBasic,
          '--experimental-https',
          '--experimental-https-key',
          keyFile,
          '--experimental-https-cert',
          certFile,
          '--port',
          port,
        ],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        await check(() => output, /https:\/\/localhost:(\d+)/)
      } finally {
        await killApp(app)
      }
    })

    test('should format IPv6 addresses correctly', async () => {
      const port = await findPort()
      let output = ''
      const app = await runNextCommandDev(
        [dirBasic, '--hostname', '::', '--port', port],
        undefined,
        {
          onStdout(msg) {
            output += stripAnsi(msg)
          },
        }
      )
      try {
        // Only display when hostname is provided
        await check(
          () => output,
          new RegExp(`Network:\\s*\\http://\\[::\\]:${port}`)
        )
        await check(() => output, new RegExp(`http://\\[::1\\]:${port}`))
      } finally {
        await killApp(app).catch(() => {})
      }
    })

    test('should warn when unknown argument provided', async () => {
      const { stderr } = await runNextCommand(['dev', '--random'], {
        stderr: true,
      })
      expect(stderr).toEqual('Unknown or unexpected option: --random\n')
    })
    test('should not throw UnhandledPromiseRejectionWarning', async () => {
      const { stderr } = await runNextCommand(['dev', '--random'], {
        stderr: true,
      })
      expect(stderr).not.toContain('UnhandledPromiseRejectionWarning')
    })

    test('should exit when SIGINT is signalled', async () => {
      const port = await findPort()
      await testExitSignal('SIGINT', ['dev', dirBasic, '-p', port], /- Local:/)
    })
    test('should exit when SIGTERM is signalled', async () => {
      const port = await findPort()
      await testExitSignal('SIGTERM', ['dev', dirBasic, '-p', port], /- Local:/)
    })

    test('invalid directory', async () => {
      const output = await runNextCommand(['dev', 'non-existent'], {
        stderr: true,
      })
      expect(output.stderr).toContain(
        'Invalid project directory provided, no such directory'
      )
    })
  })

  describe('export', () => {
    test('--help', async () => {
      const help = await runNextCommand(['export', '--help'], {
        stdout: true,
        stderr: true,
      })
      expect(help.stderr).toMatch(
        'The "next export" command has been removed in favor of "output: export" in next.config.js'
      )
      expect(help.code).toBe(1)
    })
  })

  describe('info', () => {
    function matchInfoOutput(stdout, { nextConfigOutput = '.*' } = {}) {
      expect(stdout).toMatch(
        new RegExp(`
Operating System:
  Platform: .*
  Arch: .*
  Version: .*
Binaries:
  Node: .*
  npm: .*
  Yarn: .*
  pnpm: .*
Relevant Packages:
  next: .*
  eslint-config-next: .*
  react: .*
  react-dom: .*
  typescript: .*
Next.js Config:
  output: ${nextConfigOutput}
`)
      )
    }

    test('--help', async () => {
      const help = await runNextCommand(['info', '--help'], {
        stdout: true,
      })
      expect(help.stdout).toMatch(
        /Prints relevant details about the current system which can be used to report Next\.js bugs/
      )
    })

    test('-h', async () => {
      const help = await runNextCommand(['info', '-h'], {
        stdout: true,
      })
      expect(help.stdout).toMatch(
        /Prints relevant details about the current system which can be used to report Next\.js bugs/
      )
    })

    test('should print output', async () => {
      const info = await runNextCommand(['info'], {
        stdout: true,
        stderr: true,
      })

      expect((info.stderr || '').toLowerCase()).not.toContain('error')
      matchInfoOutput(info.stdout)
    })

    test('should print output with next.config.mjs', async () => {
      let info = { stdout: '', stderr: '' }

      try {
        await fs.writeFile(
          join(dirBasic, 'next.config.mjs'),
          `export default { output: 'standalone' }`
        )
        await fs.writeFile(
          join(dirBasic, 'package.json'),
          JSON.stringify({
            type: 'module',
          })
        )
        info = await runNextCommand(['info'], {
          cwd: dirBasic,
          stdout: true,
          stderr: true,
        })
      } finally {
        await fs.remove(join(dirBasic, 'next.config.mjs'))
        await fs.remove(join(dirBasic, 'package.json'))
      }

      expect((info.stderr || '').toLowerCase()).not.toContain('error')
      matchInfoOutput(info.stdout, { nextConfigOutput: 'standalone' })
    })
  })
})
