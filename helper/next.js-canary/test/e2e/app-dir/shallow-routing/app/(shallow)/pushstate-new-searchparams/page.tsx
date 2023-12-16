'use client'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  return (
    <>
      <h1 id="pushstate-searchparams">PushState SearchParams</h1>
      <pre id="my-data">{searchParams.get('query')}</pre>
      <button
        onClick={() => {
          const url = new URL(window.location.href)
          const previousQuery = url.searchParams.get('query')
          url.searchParams.set(
            'query',
            previousQuery ? previousQuery + '-added' : 'foo'
          )
          window.history.pushState({}, '', url)
        }}
        id="push-searchparams"
      >
        Push searchParam
      </button>
    </>
  )
}
