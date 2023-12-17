'use client'

import { useState } from 'react'

export default function Counter({
  dictionary,
}: {
  dictionary: Record<string,string>
}) {
  const [count, setCount] = useState(0)
  return (
    <p className='bg-sky-500'>
      This component is rendered on client:
      <button onClick={() => setCount((n) => n - 1)}>
        {dictionary.desc1}
      </button>
      {count}
      <button onClick={() => setCount((n) => n + 1)}>
        {dictionary.desc2}
      </button>
    </p>
  )
}
