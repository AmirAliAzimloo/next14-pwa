'use client'

import React, { useState } from 'react'
import { notFound } from 'next/navigation'
import NotFoundTrigger from './not-found-trigger'

export default function Root({ children }) {
  const [clicked, setClicked] = useState(false)
  if (clicked) {
    notFound()
  }

  return (
    <html className="root-layout-html">
      <body>
        <NotFoundTrigger />
        <button id="trigger-not-found" onClick={() => setClicked(true)}>
          Click to not found
        </button>
        {children}
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
