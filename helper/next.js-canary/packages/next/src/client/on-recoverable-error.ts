import { isBailoutCSRError } from '../shared/lib/lazy-dynamic/no-ssr-error'

export default function onRecoverableError(err: any) {
  // Using default react onRecoverableError
  // x-ref: https://github.com/facebook/react/blob/d4bc16a7d69eb2ea38a88c8ac0b461d5f72cdcab/packages/react-dom/src/client/ReactDOMRoot.js#L83
  const defaultOnRecoverableError =
    typeof reportError === 'function'
      ? // In modern browsers, reportError will dispatch an error event,
        // emulating an uncaught JavaScript error.
        reportError
      : (error: any) => {
          window.console.error(error)
        }

  // Skip certain custom errors which are not expected to be reported on client
  if (isBailoutCSRError(err)) return

  defaultOnRecoverableError(err)
}
