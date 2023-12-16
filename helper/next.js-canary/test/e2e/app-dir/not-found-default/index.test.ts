import { createNextDescribe } from 'e2e-utils'
import { check, getRedboxDescription, hasRedbox } from 'next-test-utils'

createNextDescribe(
  'app dir - not found with default 404 page',
  {
    files: __dirname,
    skipDeployment: true,
  },
  ({ next, isNextDev }) => {
    it('should error on client notFound from root layout in browser', async () => {
      const browser = await next.browser('/')

      await browser.elementByCss('#trigger-not-found').click()

      if (isNextDev) {
        await check(async () => {
          expect(await hasRedbox(browser, true)).toBe(true)
          expect(await getRedboxDescription(browser)).toMatch(
            /notFound\(\) is not allowed to use in root layout/
          )
          return 'success'
        }, /success/)
      } else {
        expect(await browser.elementByCss('h2').text()).toBe(
          'Application error: a server-side exception has occurred (see the server logs for more information).'
        )
        expect(await browser.elementByCss('p').text()).toBe(
          'Digest: NEXT_NOT_FOUND'
        )
      }
    })

    it('should render default 404 with root layout for non-existent page', async () => {
      const browser = await next.browser('/non-existent')
      await browser.waitForElementByCss('.next-error-h1')
      expect(await browser.elementByCss('.next-error-h1').text()).toBe('404')
      expect(await browser.elementByCss('html').getAttribute('class')).toBe(
        'root-layout-html'
      )

      if (isNextDev) {
        const cliOutput = next.cliOutput
        expect(cliOutput).toContain('/not-found')
        expect(cliOutput).not.toContain('/_error')
      }
    })

    it('should error on server notFound from root layout on server-side', async () => {
      const browser = await next.browser('/?root-not-found=1')

      if (isNextDev) {
        expect(await hasRedbox(browser, true)).toBe(true)
        expect(await getRedboxDescription(browser)).toBe(
          'Error: notFound() is not allowed to use in root layout'
        )
      } else {
        expect(await browser.elementByCss('h2').text()).toBe(
          'Application error: a server-side exception has occurred (see the server logs for more information).'
        )
        expect(await browser.elementByCss('p').text()).toBe(
          'Digest: NEXT_NOT_FOUND'
        )
      }
    })

    it('should be able to navigate to page calling not-found', async () => {
      const browser = await next.browser('/')

      await browser.elementByCss('#navigate-not-found').click()
      await browser.waitForElementByCss('.next-error-h1')

      expect(await browser.elementByCss('h1').text()).toBe('404')
      expect(await browser.elementByCss('h2').text()).toBe(
        'This page could not be found.'
      )
    })

    it('should be able to navigate to page with calling not-found in metadata', async () => {
      const browser = await next.browser('/')

      await browser.elementByCss('#metadata-layout-not-found').click()
      await browser.waitForElementByCss('.next-error-h1')

      expect(await browser.elementByCss('h1').text()).toBe('404')
      expect(await browser.elementByCss('h2').text()).toBe(
        'This page could not be found.'
      )
    })

    it('should render default not found for group routes if not found is not defined', async () => {
      const browser = await next.browser('/group-dynamic/123')
      expect(await browser.elementByCss('#page').text()).toBe(
        'group-dynamic [id]'
      )

      await browser.loadPage(next.url + '/group-dynamic/404')
      expect(await browser.elementByCss('.next-error-h1').text()).toBe('404')
      expect(await browser.elementByCss('html').getAttribute('class')).toBe(
        'group-root-layout'
      )
    })
  }
)
