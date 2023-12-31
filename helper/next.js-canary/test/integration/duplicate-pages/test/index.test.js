/* eslint-env jest */

import path from 'path'

import {
  nextBuild,
  findPort,
  launchApp,
  renderViaHTTP,
  killApp,
} from 'next-test-utils'

const appDir = path.join(__dirname, '..')

describe('Handles Duplicate Pages', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    it('Throws an error during build', async () => {
      const { stderr } = await nextBuild(appDir, [], { stderr: true })
      expect(stderr).toContain('Duplicate page detected')
    })
  })

  describe('dev mode', () => {
    it('Shows warning in development', async () => {
      let output
      const handleOutput = (msg) => {
        output += msg
      }
      const appPort = await findPort()
      const app = await launchApp(appDir, appPort, {
        onStdout: handleOutput,
        onStderr: handleOutput,
      })
      await renderViaHTTP(appPort, '/hello')
      await killApp(app)
      expect(output).toMatch(/Duplicate page detected/)
    })
  })
})
