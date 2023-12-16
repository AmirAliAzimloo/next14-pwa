import execa from 'execa'
import fs from 'fs-extra'
import { join } from 'path'
import { setupTests } from './util'

const appDir = join(__dirname, '../app')
const imagesDir = join(appDir, '.next', 'cache', 'images')

describe('with outdated sharp', () => {
  beforeAll(async () => {
    await fs.writeFile(
      join(appDir, 'package.json'),
      JSON.stringify({
        packageManager: 'yarn@1.22.19',
      })
    )
    await execa('yarn', ['add', 'sharp@0.26.3'], {
      cwd: appDir,
      stdio: 'inherit',
    })
  })
  afterAll(async () => {
    await fs.remove(join(appDir, 'node_modules'))
    await fs.remove(join(appDir, 'yarn.lock'))
    await fs.remove(join(appDir, 'package.json'))
  })

  setupTests({ isSharp: true, isOutdatedSharp: true, appDir, imagesDir })
})
