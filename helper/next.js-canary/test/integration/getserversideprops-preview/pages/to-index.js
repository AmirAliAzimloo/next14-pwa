import Link from 'next/link'

export function getServerSideProps() {
  return { props: {} }
}

export default function () {
  return (
    <main>
      <Link href="/" id="to-index">
        To Index
      </Link>
    </main>
  )
}
