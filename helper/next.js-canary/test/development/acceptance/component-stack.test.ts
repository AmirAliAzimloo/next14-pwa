/* eslint-env jest */
import { createNextDescribe } from 'e2e-utils'
import { getRedboxComponentStack, hasRedbox } from 'next-test-utils'
import path from 'path'

createNextDescribe(
  'Component Stack in error overlay',
  {
    files: path.join(__dirname, 'fixtures', 'component-stack'),
  },
  ({ next }) => {
    it('should show a component stack on hydration error', async () => {
      const browser = await next.browser('/')

      expect(await hasRedbox(browser, true)).toBe(true)

      expect(await getRedboxComponentStack(browser)).toMatchInlineSnapshot(`
        "p
        div
        Component
        main
        Mismatch"
      `)
    })
  }
)
