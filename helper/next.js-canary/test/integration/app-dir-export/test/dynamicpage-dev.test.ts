import { runTests } from './utils'

describe('app dir - with output export - dynamic page dev', () => {
  describe('development mode', () => {
    it.each([
      { dynamicPage: 'undefined' },
      { dynamicPage: "'error'" },
      { dynamicPage: "'force-static'" },
      {
        dynamicPage: "'force-dynamic'",
        expectedErrMsg:
          'Page with `dynamic = "force-dynamic"` couldn\'t be rendered statically because it used `output: export`.',
      },
    ])(
      'should work in dev with dynamicPage $dynamicPage',
      async ({ dynamicPage, expectedErrMsg }) => {
        await runTests({ isDev: true, dynamicPage, expectedErrMsg })
      }
    )
  })
})
