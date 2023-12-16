import { createNextDescribe } from 'e2e-utils'
import { check } from 'next-test-utils'
import { BrowserInterface } from 'test/lib/browsers/base'
import { Request } from 'playwright-chromium'

const getPathname = (url: string) => {
  const urlObj = new URL(url)
  return urlObj.pathname
}

const browserConfigWithFixedTime = {
  beforePageLoad: (page) => {
    page.addInitScript(() => {
      const startTime = new Date()
      const fixedTime = new Date('2023-04-17T00:00:00Z')

      // Override the Date constructor
      // @ts-ignore
      // eslint-disable-next-line no-native-reassign
      Date = class extends Date {
        constructor() {
          super()
          // @ts-ignore
          return new startTime.constructor(fixedTime)
        }

        static now() {
          return fixedTime.getTime()
        }
      }
    })
  },
}

const fastForwardTo = (ms) => {
  // Increment the fixed time by the specified duration
  const currentTime = new Date()
  currentTime.setTime(currentTime.getTime() + ms)

  // Update the Date constructor to use the new fixed time
  // @ts-ignore
  // eslint-disable-next-line no-native-reassign
  Date = class extends Date {
    constructor() {
      super()
      // @ts-ignore
      return new currentTime.constructor(currentTime)
    }

    static now() {
      return currentTime.getTime()
    }
  }
}

const createRequestsListener = async (browser: BrowserInterface) => {
  // wait for network idle
  await browser.waitForIdleNetwork()

  let requests = []

  browser.on('request', (req: Request) => {
    requests.push([req.url(), !!req.headers()['next-router-prefetch']])
  })

  await browser.refresh()

  return {
    getRequests: () => requests,
    clearRequests: () => {
      requests = []
    },
  }
}

createNextDescribe(
  'app dir client cache semantics',
  {
    files: __dirname,
  },
  ({ next, isNextDev }) => {
    if (isNextDev) {
      // since the router behavior is different in dev mode (no viewport prefetching + liberal revalidation)
      // we only check the production behavior
      it('should skip dev', () => {})
    } else {
      describe('prefetch={true}', () => {
        let browser: BrowserInterface

        beforeEach(async () => {
          browser = (await next.browser(
            '/',
            browserConfigWithFixedTime
          )) as BrowserInterface
        })

        it('should prefetch the full page', async () => {
          const { getRequests, clearRequests } = await createRequestsListener(
            browser
          )
          await check(() => {
            return getRequests().some(
              ([url, didPartialPrefetch]) =>
                getPathname(url) === '/0' && !didPartialPrefetch
            )
              ? 'success'
              : 'fail'
          }, 'success')

          clearRequests()

          await browser
            .elementByCss('[href="/0?timeout=0"]')
            .click()
            .waitForElementByCss('#random-number')

          expect(
            getRequests().every(([url]) => getPathname(url) !== '/0')
          ).toEqual(true)
        })
        it('should re-use the cache for the full page, only for 5 mins', async () => {
          const randomNumber = await browser
            .elementByCss('[href="/0?timeout=0"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          await browser.elementByCss('[href="/"]').click()

          const number = await browser
            .elementByCss('[href="/0?timeout=0"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(number).toBe(randomNumber)

          await browser.eval(fastForwardTo, 5 * 60 * 1000)

          await browser.elementByCss('[href="/"]').click()

          const newNumber = await browser
            .elementByCss('[href="/0?timeout=0"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(newNumber).not.toBe(randomNumber)
        })

        it('should prefetch again after 5 mins if the link is visible again', async () => {
          const { getRequests, clearRequests } = await createRequestsListener(
            browser
          )

          await check(() => {
            return getRequests().some(
              ([url, didPartialPrefetch]) =>
                getPathname(url) === '/0' && !didPartialPrefetch
            )
              ? 'success'
              : 'fail'
          }, 'success')

          const randomNumber = await browser
            .elementByCss('[href="/0?timeout=0"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          await browser.eval(fastForwardTo, 5 * 60 * 1000)
          clearRequests()

          await browser.elementByCss('[href="/"]').click()

          await check(() => {
            return getRequests().some(
              ([url, didPartialPrefetch]) =>
                getPathname(url) === '/0' && !didPartialPrefetch
            )
              ? 'success'
              : 'fail'
          }, 'success')

          const number = await browser
            .elementByCss('[href="/0?timeout=0"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(number).not.toBe(randomNumber)
        })
      })
      describe('prefetch={false}', () => {
        let browser: BrowserInterface

        beforeEach(async () => {
          browser = (await next.browser(
            '/',
            browserConfigWithFixedTime
          )) as BrowserInterface
        })
        it('should not prefetch the page at all', async () => {
          const { getRequests } = await createRequestsListener(browser)

          await browser
            .elementByCss('[href="/2"]')
            .click()
            .waitForElementByCss('#random-number')

          expect(
            getRequests().filter(([url]) => getPathname(url) === '/2')
          ).toHaveLength(1)

          expect(
            getRequests().some(
              ([url, didPartialPrefetch]) =>
                getPathname(url) === '/2' && didPartialPrefetch
            )
          ).toBe(false)
        })
        it('should re-use the cache only for 30 seconds', async () => {
          const randomNumber = await browser
            .elementByCss('[href="/2"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          await browser.elementByCss('[href="/"]').click()

          const number = await browser
            .elementByCss('[href="/2"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(number).toBe(randomNumber)

          await browser.eval(fastForwardTo, 30 * 1000)

          await browser.elementByCss('[href="/"]').click()

          const newNumber = await browser
            .elementByCss('[href="/2"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(newNumber).not.toBe(randomNumber)
        })
      })
      describe('prefetch={undefined} - default', () => {
        let browser: BrowserInterface

        beforeEach(async () => {
          browser = (await next.browser(
            '/',
            browserConfigWithFixedTime
          )) as BrowserInterface
        })

        it('should prefetch partially a dynamic page', async () => {
          const { getRequests, clearRequests } = await createRequestsListener(
            browser
          )

          await check(() => {
            return getRequests().some(
              ([url, didPartialPrefetch]) =>
                getPathname(url) === '/1' && didPartialPrefetch
            )
              ? 'success'
              : 'fail'
          }, 'success')

          clearRequests()

          await browser
            .elementByCss('[href="/1"]')
            .click()
            .waitForElementByCss('#random-number')

          expect(
            getRequests().some(
              ([url, didPartialPrefetch]) =>
                getPathname(url) === '/1' && !didPartialPrefetch
            )
          ).toBe(true)
        })
        it('should re-use the full cache for only 30 seconds', async () => {
          const randomNumber = await browser
            .elementByCss('[href="/1"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          await browser.elementByCss('[href="/"]').click()

          const number = await browser
            .elementByCss('[href="/1"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(number).toBe(randomNumber)

          await browser.eval(fastForwardTo, 5 * 1000)

          await browser.elementByCss('[href="/"]').click()

          const newNumber = await browser
            .elementByCss('[href="/1"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(newNumber).toBe(randomNumber)

          await browser.eval(fastForwardTo, 30 * 1000)

          await browser.elementByCss('[href="/"]').click()

          const newNumber2 = await browser
            .elementByCss('[href="/1"]')
            .click()
            .waitForElementByCss('#random-number')
            .text()

          expect(newNumber2).not.toBe(newNumber)
        })
        it('should refetch below the fold after 30 seconds', async () => {
          const randomLoadingNumber = await browser
            .elementByCss('[href="/1?timeout=1000"]')
            .click()
            .waitForElementByCss('#loading')
            .text()

          const randomNumber = await browser
            .waitForElementByCss('#random-number')
            .text()

          await browser.elementByCss('[href="/"]').click()

          await browser.eval(fastForwardTo, 30 * 1000)

          const newLoadingNumber = await browser
            .elementByCss('[href="/1?timeout=1000"]')
            .click()
            .waitForElementByCss('#loading')
            .text()

          const newNumber = await browser
            .waitForElementByCss('#random-number')
            .text()

          expect(newLoadingNumber).toBe(randomLoadingNumber)

          expect(newNumber).not.toBe(randomNumber)
        })
        it('should refetch the full page after 5 mins', async () => {
          const randomLoadingNumber = await browser
            .elementByCss('[href="/1?timeout=1000"]')
            .click()
            .waitForElementByCss('#loading')
            .text()

          const randomNumber = await browser
            .waitForElementByCss('#random-number')
            .text()

          await browser.eval(fastForwardTo, 5 * 60 * 1000)

          await browser
            .elementByCss('[href="/"]')
            .click()
            .waitForElementByCss('[href="/1?timeout=1000"]')

          const newLoadingNumber = await browser
            .elementByCss('[href="/1?timeout=1000"]')
            .click()
            .waitForElementByCss('#loading')
            .text()

          const newNumber = await browser
            .waitForElementByCss('#random-number')
            .text()

          expect(newLoadingNumber).not.toBe(randomLoadingNumber)

          expect(newNumber).not.toBe(randomNumber)
        })
      })
      describe('router.push', () => {
        it('should re-use the cache for 30 seconds', async () => {})
        it('should fully refetch the page after 30 seconds', async () => {})
      })
    }
  }
)
