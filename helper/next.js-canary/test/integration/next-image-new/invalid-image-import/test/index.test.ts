/* eslint-env jest */

import { join } from 'path'
import {
  findPort,
  getRedboxHeader,
  getRedboxSource,
  hasRedbox,
  killApp,
  launchApp,
  nextBuild,
} from 'next-test-utils'
import webdriver from 'next-webdriver'
import stripAnsi from 'strip-ansi'

const appDir = join(__dirname, '../')
let appPort: number
let app
let stderr = ''
const msg =
  'Error: Image import "../public/invalid.svg" is not a valid image file. The image may be corrupted or an unsupported format.'

function runTests({ isDev }) {
  it('should show error', async () => {
    if (isDev) {
      const browser = await webdriver(appPort, '/')
      expect(await hasRedbox(browser, true)).toBe(true)
      expect(await getRedboxHeader(browser)).toBe('Failed to compile')
      expect(await getRedboxSource(browser)).toBe(`./pages/index.js:3\n${msg}`)
      expect(stripAnsi(stderr)).toContain(msg)
    } else {
      expect(stripAnsi(stderr)).toContain(msg)
    }
  })
}

describe('Missing Import Image Tests', () => {
  describe('dev mode', () => {
    beforeAll(async () => {
      stderr = ''
      appPort = await findPort()
      app = await launchApp(appDir, appPort, {
        onStderr(msg) {
          stderr += msg || ''
        },
      })
    })
    afterAll(async () => {
      if (app) {
        await killApp(app)
      }
    })

    runTests({ isDev: true })
  })
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    beforeAll(async () => {
      stderr = ''
      const result = await nextBuild(appDir, [], { stderr: true })
      stderr = result.stderr
    })
    afterAll(async () => {
      if (app) {
        await killApp(app)
      }
    })

    runTests({ isDev: false })
  })
})
