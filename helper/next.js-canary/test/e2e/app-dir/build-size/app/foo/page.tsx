'use client'
import React from 'react'
import styles from '../../styles/index.module.css'

export default function Page() {
  return (
    <>
      <p id="hello" className={styles.content}>
        hello from /foo
      </p>
      <p id="react-version">{React.version}</p>
    </>
  )
}
