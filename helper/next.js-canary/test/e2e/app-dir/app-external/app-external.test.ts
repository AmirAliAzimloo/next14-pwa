import { createNextDescribe } from 'e2e-utils'
import { check, shouldRunTurboDevTest } from 'next-test-utils'

async function resolveStreamResponse(response: any, onData?: any) {
  let result = ''
  onData = onData || (() => {})
  await new Promise((resolve) => {
    response.body.on('data', (chunk) => {
      result += chunk.toString()
      onData(chunk.toString(), result)
    })

    response.body.on('end', resolve)
  })
  return result
}

createNextDescribe(
  'app dir - external dependency',
  {
    files: __dirname,
    dependencies: {
      react: 'latest',
      'react-dom': 'latest',
      swr: 'latest',
    },
    packageJson: {
      scripts: {
        setup: `cp -r ./node_modules_bak/* ./node_modules`,
        build: 'yarn setup && next build',
        dev: `yarn setup && next ${
          shouldRunTurboDevTest() ? 'dev --turbo' : 'dev'
        }`,
        start: 'next start',
      },
    },
    installCommand: 'yarn',
    startCommand: (global as any).isNextDev ? 'yarn dev' : 'yarn start',
    buildCommand: 'yarn build',
    skipDeployment: true,
  },
  ({ next }) => {
    it('should be able to opt-out 3rd party packages being bundled in server components', async () => {
      await next.fetch('/react-server/optout').then(async (response) => {
        const result = await resolveStreamResponse(response)
        expect(result).toContain('Server: index.default')
        expect(result).toContain('Server subpath: subpath.default')
        expect(result).toContain('Client: index.default')
        expect(result).toContain('Client subpath: subpath.default')
        expect(result).toContain('opt-out-react-version: 18.2.0')
      })
    })

    it('should handle external async module libraries correctly', async () => {
      const clientHtml = await next.render('/external-imports/client')
      const serverHtml = await next.render('/external-imports/server')
      const sharedHtml = await next.render('/shared-esm-dep')

      const browser = await next.browser('/external-imports/client')
      const browserClientText = await browser.elementByCss('#content').text()

      function containClientContent(content) {
        expect(content).toContain('module type:esm-export')
        expect(content).toContain('export named:named')
        expect(content).toContain('export value:123')
        expect(content).toContain('export array:4,5,6')
        expect(content).toContain('export object:{x:1}')
        expect(content).toContain('swr-state')
      }

      containClientContent(clientHtml)
      containClientContent(browserClientText)

      // support esm module imports on server side, and indirect imports from shared components
      expect(serverHtml).toContain('pure-esm-module')
      expect(sharedHtml).toContain(
        'node_modules instance from client module pure-esm-module'
      )
    })

    it('should transpile specific external packages with the `transpilePackages` option', async () => {
      const clientHtml = await next.render('/external-imports/client')
      expect(clientHtml).toContain('transpilePackages:5')
    })

    it('should resolve the subset react in server components based on the react-server condition', async () => {
      await next.fetch('/react-server').then(async (response) => {
        const result = await resolveStreamResponse(response)
        expect(result).toContain('Server: <!-- -->subset')
        expect(result).toContain('Client: <!-- -->full')
      })
    })

    it('should resolve 3rd party package exports based on the react-server condition', async () => {
      const $ = await next.render$('/react-server/3rd-party-package')

      const result = $('body').text()

      // Package should be resolved based on the react-server condition,
      // as well as package's internal & external dependencies.
      expect(result).toContain(
        'Server: index.react-server:react.subset:dep.server'
      )
      expect(result).toContain('Client: index.default:react.full:dep.default')

      // Subpath exports should be resolved based on the condition too.
      expect(result).toContain('Server subpath: subpath.react-server')
      expect(result).toContain('Client subpath: subpath.default')

      // Prefer `module` field for isomorphic packages.
      expect($('#main-field').text()).toContain('server-module-field:module')
    })

    it('should correctly collect global css imports and mark them as side effects', async () => {
      await next.fetch('/css/a').then(async (response) => {
        const result = await resolveStreamResponse(response)

        // It should include the global CSS import
        expect(result).toMatch(/\.css/)
      })
    })

    it('should handle external css modules', async () => {
      const browser = await next.browser('/css/modules')

      expect(
        await browser.eval(
          `window.getComputedStyle(document.querySelector('h1')).color`
        )
      ).toBe('rgb(255, 0, 0)')
    })

    it('should use the same export type for packages in both ssr and client', async () => {
      const browser = await next.browser('/client-dep')
      expect(await browser.eval(`window.document.body.innerText`)).toBe('hello')
    })

    it('should handle external css modules in pages', async () => {
      const browser = await next.browser('/test-pages')

      expect(
        await browser.eval(
          `window.getComputedStyle(document.querySelector('h1')).color`
        )
      ).toBe('rgb(255, 0, 0)')
    })

    it('should handle external next/font', async () => {
      const browser = await next.browser('/font')

      expect(
        await browser.eval(
          `window.getComputedStyle(document.querySelector('p')).fontFamily`
        )
      ).toMatch(/^__myFont_.{6}, __myFont_Fallback_.{6}$/)
    })

    describe('react in external esm packages', () => {
      it('should use the same react in client app', async () => {
        const html = await next.render('/esm/client')

        const v1 = html.match(/App React Version: ([^<]+)</)[1]
        const v2 = html.match(/External React Version: ([^<]+)</)[1]
        expect(v1).toBe(v2)

        // Should work with both esm and cjs imports
        expect(html).toContain(
          'CJS-ESM Compat package: cjs-esm-compat/index.mjs'
        )
        expect(html).toContain('CJS package: cjs-lib')
        expect(html).toContain(
          'Nested imports: nested-import:esm:cjs-esm-compat/index.mjs'
        )
      })

      it('should use the same react in server app', async () => {
        const html = await next.render('/esm/server')

        const v1 = html.match(/App React Version: ([^<]+)</)[1]
        const v2 = html.match(/External React Version: ([^<]+)</)[1]
        expect(v1).toBe(v2)

        // Should work with both esm and cjs imports
        expect(html).toContain(
          'CJS-ESM Compat package: cjs-esm-compat/index.mjs'
        )
        expect(html).toContain('CJS package: cjs-lib')
      })

      it('should use the same react in edge server app', async () => {
        const html = await next.render('/esm/edge-server')

        const v1 = html.match(/App React Version: ([^<]+)</)[1]
        const v2 = html.match(/External React Version: ([^<]+)</)[1]
        expect(v1).toBe(v2)

        // Should work with both esm and cjs imports
        expect(html).toContain(
          'CJS-ESM Compat package: cjs-esm-compat/index.mjs'
        )
        expect(html).toContain('CJS package: cjs-lib')
      })

      it('should use the same react in pages', async () => {
        const html = await next.render('/test-pages-esm')

        const v1 = html.match(/App React Version: ([^<]+)</)[1]
        const v2 = html.match(/External React Version: ([^<]+)</)[1]
        expect(v1).toBe(v2)
      })
    })

    describe('mixed syntax external modules', () => {
      it('should handle mixed module with next/dynamic', async () => {
        const browser = await next.browser('/mixed/dynamic')
        expect(await browser.elementByCss('#component').text()).toContain(
          'mixed-syntax-esm'
        )
      })

      it('should handle mixed module in server and client components', async () => {
        const $ = await next.render$('/mixed/import')
        expect(await $('#server').text()).toContain('server:mixed-syntax-esm')
        expect(await $('#client').text()).toContain('client:mixed-syntax-esm')
        expect(await $('#relative-mixed').text()).toContain(
          'relative-mixed-syntax-esm'
        )
      })
    })

    it('should export client module references in esm', async () => {
      const html = await next.render('/esm-client-ref')
      expect(html).toContain('hello')
    })

    it('should support exporting multiple star re-exports', async () => {
      const html = await next.render('/wildcard')
      expect(html).toContain('Foo')
    })

    it('should have proper tree-shaking for known modules in CJS', async () => {
      const html = await next.render('/test-middleware')
      expect(html).toContain('it works')

      const middlewareBundle = await next.readFile('.next/server/middleware.js')
      expect(middlewareBundle).not.toContain('image-response')
    })

    it('should use the same async storages if imported directly', async () => {
      const html = await next.render('/async-storage')
      expect(html).toContain('success')
    })

    it('should not prefer to resolve esm over cjs for bundling optout packages', async () => {
      const browser = await next.browser('/optout/action')
      expect(await browser.elementByCss('#dual-pkg-outout p').text()).toBe('')

      browser.elementByCss('#dual-pkg-outout button').click()
      await check(async () => {
        const text = await browser.elementByCss('#dual-pkg-outout p').text()
        if (process.env.TURBOPACK) {
          // The prefer esm won't effect turbopack resolving
          expect(text).toBe('dual-pkg-optout:mjs')
        } else {
          expect(text).toBe('dual-pkg-optout:cjs')
        }
        return 'success'
      }, /success/)
    })
  }
)
