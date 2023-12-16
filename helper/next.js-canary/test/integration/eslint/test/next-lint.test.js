import fs from 'fs-extra'
import os from 'os'

import { join } from 'path'

import findUp from 'next/dist/compiled/find-up'
import { File, nextBuild, nextLint } from 'next-test-utils'

const dirFirstTimeSetup = join(__dirname, '../first-time-setup')
const dirCustomConfig = join(__dirname, '../custom-config')
const dirWebVitalsConfig = join(__dirname, '../config-core-web-vitals')
const dirPluginRecommendedConfig = join(
  __dirname,
  '../plugin-recommended-config'
)
const dirPluginCoreWebVitalsConfig = join(
  __dirname,
  '../plugin-core-web-vitals-config'
)
const dirIgnoreDuringBuilds = join(__dirname, '../ignore-during-builds')
const dirBaseDirectories = join(__dirname, '../base-directories')
const dirCustomDirectories = join(__dirname, '../custom-directories')
const dirConfigInPackageJson = join(__dirname, '../config-in-package-json')
const dirInvalidOlderEslintVersion = join(
  __dirname,
  '../invalid-eslint-version'
)
const dirMaxWarnings = join(__dirname, '../max-warnings')
const dirEmptyDirectory = join(__dirname, '../empty-directory')
const dirEslintIgnore = join(__dirname, '../eslint-ignore')
const dirNoEslintPlugin = join(__dirname, '../no-eslint-plugin')
const dirNoConfig = join(__dirname, '../no-config')
const dirEslintCache = join(__dirname, '../eslint-cache')
const dirEslintCacheCustomDir = join(__dirname, '../eslint-cache-custom-dir')
const dirFileLinting = join(__dirname, '../file-linting')
const mjsCjsLinting = join(__dirname, '../mjs-cjs-linting')
const dirTypescript = join(__dirname, '../with-typescript')

describe('Next Lint', () => {
  describe('First Time Setup ', () => {
    async function nextLintTemp(setupCallback) {
      const folder = join(os.tmpdir(), Math.random().toString(36).substring(2))
      await fs.mkdirp(folder)
      await fs.copy(dirNoConfig, folder)
      await setupCallback?.(folder)

      try {
        const { stdout, stderr } = await nextLint(folder, ['--strict'], {
          stderr: true,
          stdout: true,
          cwd: folder,
        })

        console.log({ stdout, stderr })

        const pkgJson = JSON.parse(
          await fs.readFile(join(folder, 'package.json'), 'utf8')
        )
        const eslintrcJson = JSON.parse(
          await fs.readFile(join(folder, '.eslintrc.json'), 'utf8')
        )

        return { stdout, pkgJson, eslintrcJson }
      } finally {
        await fs.remove(folder)
      }
    }

    test('show a prompt to set up ESLint if no configuration detected', async () => {
      const eslintrcJson = join(dirFirstTimeSetup, '.eslintrc.json')
      await fs.writeFile(eslintrcJson, '')

      const { stdout, stderr } = await nextLint(dirFirstTimeSetup, [], {
        stdout: true,
        stderr: true,
      })
      const output = stdout + stderr
      expect(output).toContain('How would you like to configure ESLint?')

      // Different options that can be selected
      expect(output).toContain('Strict (recommended)')
      expect(output).toContain('Base')
      expect(output).toContain('Cancel')
    })

    for (const { packageManger, lockFile } of [
      { packageManger: 'yarn', lockFile: 'yarn.lock' },
      { packageManger: 'pnpm', lockFile: 'pnpm-lock.yaml' },
      { packageManger: 'npm', lockFile: 'package-lock.json' },
    ]) {
      test(`installs eslint and eslint-config-next as devDependencies if missing with ${packageManger}`, async () => {
        const { stdout, pkgJson } = await nextLintTemp(async (folder) => {
          await fs.writeFile(join(folder, lockFile), '')
        })

        expect(stdout).toContain(
          `Installing devDependencies (${packageManger}):`
        )
        expect(stdout).toContain('eslint')
        expect(stdout).toContain('eslint-config-next')
        expect(stdout).toContain(packageManger)
        expect(pkgJson.devDependencies).toHaveProperty('eslint')
        expect(pkgJson.devDependencies).toHaveProperty('eslint-config-next')
      })
    }

    test('creates .eslintrc.json file with a default configuration', async () => {
      const { stdout, eslintrcJson } = await nextLintTemp()

      expect(stdout).toContain(
        'We created the .eslintrc.json file for you and included your selected configuration'
      )
      expect(eslintrcJson).toMatchObject({ extends: 'next/core-web-vitals' })
    })

    test('shows a successful message when completed', async () => {
      const { stdout } = await nextLintTemp()

      expect(stdout).toContain(
        'ESLint has successfully been configured. Run next lint again to view warnings and errors'
      )
    })
  })

  test('should generate next-env.d.ts before lint command', async () => {
    await nextLint(dirTypescript, [], {
      stdout: true,
      stderr: true,
    })

    const files = await fs.readdir(dirTypescript)

    expect(files).toContain('next-env.d.ts')
  })

  for (const { dir } of [
    { dir: dirEmptyDirectory },
    { dir: dirIgnoreDuringBuilds },
    { dir: dirCustomDirectories },
    { dir: dirConfigInPackageJson },
  ]) {
    test('should not generate next-env.d.ts without typescript', async () => {
      await nextLint(dir, [], {
        stdout: true,
        stderr: true,
      })

      const files = await fs.readdir(dir)

      expect(files).not.toContain('next-env.d.ts')
    })
  }

  test('should add relative path for dist types in tsconfig.json when app dir exist', async () => {
    await nextLint(dirTypescript, [], {
      stdout: true,
      stderr: true,
    })

    const tsConfigPath = join(dirTypescript, '../with-typescript/tsconfig.json')
    const tsConfigContent = await fs.readFile(tsConfigPath, {
      encoding: 'utf8',
    })
    const tsConfigJson = JSON.parse(tsConfigContent)

    expect(tsConfigJson.include).toContain('.build/types/**/*.ts')
  })

  test('shows warnings and errors', async () => {
    const { stdout, stderr } = await nextLint(dirCustomConfig, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain('Warning: Synchronous scripts should not be used.')
    expect(output).toContain(
      'Error: Comments inside children section of tag should be placed inside braces'
    )
  })

  test('base directories are linted by default', async () => {
    const { stdout, stderr } = await nextLint(dirBaseDirectories, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain(
      'Error: `next/head` should not be imported in `pages/_document.js`. Use `<Head />` from `next/document` instead'
    )
    expect(output).toContain(
      'Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images.'
    )
    expect(output).toContain('Warning: Do not include stylesheets manually')
    expect(output).toContain('Warning: Synchronous scripts should not be used')
    expect(output).toContain(
      'Warning: `rel="preconnect"` is missing from Google Font'
    )

    // Files in app, pages, components, lib, and src directories are linted
    expect(output).toContain('pages/_document.js')
    expect(output).toContain('components/bar.js')
    expect(output).toContain('lib/foo.js')
    expect(output).toContain('src/index.js')
    expect(output).toContain('app/layout.js')
  })

  test('shows warnings and errors with next/core-web-vitals config', async () => {
    const { stdout, stderr } = await nextLint(dirWebVitalsConfig, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain(
      'Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images.'
    )
    expect(output).toContain('Error: Synchronous scripts should not be used.')
  })

  test('shows warnings and errors when extending plugin recommended config', async () => {
    const { stdout, stderr } = await nextLint(dirPluginRecommendedConfig, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain('Warning: Synchronous scripts should not be used.')
    expect(output).toContain(
      'Error: `<Document />` from `next/document` should not be imported outside of `pages/_document.js`.'
    )
  })

  test('shows warnings and errors when extending plugin core-web-vitals config', async () => {
    const { stdout, stderr } = await nextLint(
      dirPluginCoreWebVitalsConfig,
      [],
      {
        stdout: true,
        stderr: true,
      }
    )

    const output = stdout + stderr
    expect(output).toContain(
      'Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images.'
    )
    expect(output).toContain('Error: Synchronous scripts should not be used.')
  })

  test('success message when no warnings or errors', async () => {
    const eslintrcJson = join(dirFirstTimeSetup, '.eslintrc.json')
    await fs.writeFile(eslintrcJson, '{ "extends": "next", "root": true }\n')

    const { stdout, stderr } = await nextLint(dirFirstTimeSetup, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain('No ESLint warnings or errors')
  })

  test("don't create .eslintrc file if package.json has eslintConfig field", async () => {
    const eslintrcFile =
      (await findUp(
        [
          '.eslintrc.js',
          '.eslintrc.cjs',
          '.eslintrc.yaml',
          '.eslintrc.yml',
          '.eslintrc.json',
          '.eslintrc',
        ],
        {
          cwd: '.',
        }
      )) ?? null

    try {
      // If we found a .eslintrc file, it's probably config from root Next.js directory. Rename it during the test
      if (eslintrcFile) {
        await fs.move(eslintrcFile, `${eslintrcFile}.original`)
      }

      const { stdout, stderr } = await nextLint(dirConfigInPackageJson, [], {
        stdout: true,
        stderr: true,
      })

      const output = stdout + stderr
      expect(output).not.toContain(
        'We created the .eslintrc file for you and included your selected configuration'
      )
    } finally {
      // Restore original .eslintrc file
      if (eslintrcFile) {
        await fs.move(`${eslintrcFile}.original`, eslintrcFile)
      }
    }
  })

  test('quiet flag suppresses warnings and only reports errors', async () => {
    const { stdout, stderr } = await nextLint(dirCustomConfig, ['--quiet'], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain(
      'Error: Comments inside children section of tag should be placed inside braces'
    )
    expect(output).not.toContain(
      'Warning: Synchronous scripts should not be used.'
    )
  })

  test('custom directories', async () => {
    const { stdout, stderr } = await nextLint(dirCustomDirectories, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr
    expect(output).toContain(
      'Error: Comments inside children section of tag should be placed inside braces'
    )
    expect(output).toContain('Warning: Synchronous scripts should not be used.')
  })

  test('max warnings flag errors when warnings exceed threshold', async () => {
    const { stdout, stderr } = await nextLint(
      dirMaxWarnings,
      ['--max-warnings', 1],
      {
        stdout: true,
        stderr: true,
      }
    )

    expect(stderr).not.toEqual('')
    expect(stderr).toContain('Warning: Synchronous scripts should not be used.')
    expect(stdout).not.toContain(
      'Warning: Synchronous scripts should not be used.'
    )
  })

  test('max warnings flag does not error when warnings do not exceed threshold', async () => {
    const { stdout, stderr } = await nextLint(
      dirMaxWarnings,
      ['--max-warnings', 2],
      {
        stdout: true,
        stderr: true,
      }
    )

    expect(stderr).toEqual('')
    expect(stderr).not.toContain(
      'Warning: Synchronous scripts should not be used.'
    )
    expect(stdout).toContain('Warning: Synchronous scripts should not be used.')
  })

  test('format flag supports additional user-defined formats', async () => {
    const { stdout, stderr } = await nextLint(
      dirMaxWarnings,
      ['-f', 'codeframe'],
      {
        stdout: true,
        stderr: true,
      }
    )

    const output = stdout + stderr
    expect(output).toContain('warning: Synchronous scripts should not be used.')
    expect(stdout).toContain('<script src="https://example.com" />')
    expect(stdout).toContain('2 warnings found')
  })

  test('file flag can selectively lint only a single file', async () => {
    const { stdout, stderr } = await nextLint(
      dirFileLinting,
      ['--file', 'utils/math.js'],
      {
        stdout: true,
        stderr: true,
      }
    )

    const output = stdout + stderr

    expect(output).toContain('utils/math.js')
    expect(output).toContain(
      'Comments inside children section of tag should be placed inside braces'
    )

    expect(output).not.toContain('pages/')
    expect(output).not.toContain('Synchronous scripts should not be used.')
  })

  test('file flag can selectively lints multiple files', async () => {
    const { stdout, stderr } = await nextLint(
      dirFileLinting,
      ['--file', 'utils/math.js', '--file', 'pages/bar.js'],
      {
        stdout: true,
        stderr: true,
      }
    )

    const output = stdout + stderr

    expect(output).toContain('utils/math.js')
    expect(output).toContain(
      'Comments inside children section of tag should be placed inside braces'
    )

    expect(output).toContain('pages/bar.js')
    expect(output).toContain(
      'Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images.'
    )

    expect(output).not.toContain('pages/index.js')
    expect(output).not.toContain('Synchronous scripts should not be used.')
  })

  test('output flag create a file respecting the chosen format', async () => {
    const filePath = `${__dirname}/output/output.json`
    const { stdout, stderr } = await nextLint(
      dirFileLinting,
      ['--format', 'json', '--output-file', filePath],
      {
        stdout: true,
        stderr: true,
      }
    )

    const cliOutput = stdout + stderr
    const fileOutput = await fs.readJSON(filePath)

    expect(cliOutput).toContain(`The output file has been created: ${filePath}`)

    if (fileOutput && fileOutput.length) {
      fileOutput.forEach((file) => {
        expect(file).toHaveProperty('filePath')
        expect(file).toHaveProperty('messages')
        expect(file).toHaveProperty('errorCount')
        expect(file).toHaveProperty('warningCount')
        expect(file).toHaveProperty('fixableErrorCount')
        expect(file).toHaveProperty('fixableWarningCount')
        expect(file).toHaveProperty('source')
        expect(file).toHaveProperty('usedDeprecatedRules')
      })

      expect(fileOutput[0].messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message:
              'img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.',
          }),
          expect.objectContaining({
            message:
              'Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element',
          }),
        ])
      )

      expect(fileOutput[1].messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message:
              'Synchronous scripts should not be used. See: https://nextjs.org/docs/messages/no-sync-scripts',
          }),
        ])
      )
    }
  })

  test('output flag create a file respecting the chosen format', async () => {
    const filePath = `${__dirname}/output/output.txt`
    const { stdout, stderr } = await nextLint(
      dirFileLinting,
      ['--format', 'compact', '--output-file', filePath],
      {
        stdout: true,
        stderr: true,
      }
    )

    const cliOutput = stdout + stderr
    const fileOutput = fs.readFileSync(filePath, 'utf8')

    expect(cliOutput).toContain(`The output file has been created: ${filePath}`)

    expect(fileOutput).toContain('file-linting/pages/bar.js')
    expect(fileOutput).toContain(
      'img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.'
    )
    expect(fileOutput).toContain(
      'Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element'
    )

    expect(fileOutput).toContain('file-linting/pages/index.js')
    expect(fileOutput).toContain(
      'Synchronous scripts should not be used. See: https://nextjs.org/docs/messages/no-sync-scripts'
    )
  })

  test('show error message when the file path is a directory', async () => {
    const filePath = `${__dirname}`
    const { stdout, stderr } = await nextLint(
      dirFileLinting,
      ['--format', 'compact', '--output-file', filePath],
      {
        stdout: true,
        stderr: true,
      }
    )

    const cliOutput = stdout + stderr

    expect(cliOutput).toContain(
      `Cannot write to output file path, it is a directory: ${filePath}`
    )
  })

  test('lint files with cjs and mjs file extension', async () => {
    const { stdout, stderr } = await nextLint(mjsCjsLinting, [], {
      stdout: true,
      stderr: true,
    })

    const output = stdout + stderr

    expect(output).toContain('pages/bar.mjs')
    expect(output).toContain(
      'img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.'
    )
    expect(output).toContain(
      'Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element'
    )

    expect(output).toContain('pages/index.cjs')
    expect(output).toContain(
      'Synchronous scripts should not be used. See: https://nextjs.org/docs/messages/no-sync-scripts'
    )
  })
})
