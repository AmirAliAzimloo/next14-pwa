export const fetchCache = 'default-cache'

export default async function Page() {
  const dataNoCache = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random?no-cache',
    {
      cache: 'no-cache',
    }
  ).then((res) => res.text())

  const dataForceCache = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random?force-cache',
    {
      cache: 'force-cache',
    }
  ).then((res) => res.text())

  const dataRevalidate0 = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random?revalidate-0',
    {
      next: {
        revalidate: 0,
      },
    }
  ).then((res) => res.text())

  const dataRevalidateCache = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random?revalidate-3',
    {
      next: {
        revalidate: 3,
      },
    }
  ).then((res) => res.text())

  const dataRevalidateAndFetchCache = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random?revalidate-3-force-cache',
    {
      next: {
        revalidate: 3,
      },
      cache: 'force-cache',
    }
  ).then((res) => res.text())

  const dataAutoCache = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random?auto-cache'
  ).then((res) => res.text())

  return (
    <>
      <p>/force-cache</p>
      <p id="data-no-cache">"cache: no-cache" {dataNoCache}</p>
      <p id="data-force-cache">"cache: force-cache" {dataForceCache}</p>
      <p id="data-revalidate-0">"revalidate: 0" {dataRevalidate0}</p>
      <p id="data-revalidate-cache">"revalidate: 3" {dataRevalidateCache}</p>
      <p id="data-revalidate-and-fetch-cache">
        "revalidate: 3 and cache: force-cache" {dataRevalidateAndFetchCache}
      </p>
      <p id="data-auto-cache">"auto cache" {dataAutoCache}</p>
    </>
  )
}
