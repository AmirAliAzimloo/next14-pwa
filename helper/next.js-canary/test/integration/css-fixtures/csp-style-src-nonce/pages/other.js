import Link from 'next/link'
import css from './other.module.css'

export default function Other() {
  return (
    <main>
      <Link href="/" id="link-index">
        index page
      </Link>
      <br />
      <h1 id="blue-title" className={css.blue}>
        Blue
      </h1>
    </main>
  )
}
