import {
  Environment,
  FetchFunction,
  fetchQuery,
  graphql,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'
import { GetServerSideProps } from 'next'
import { pagesAQuery } from '../__generated__/pagesAQuery.graphql'

type Props = { greeting: string }

export default function Index({ greeting }: Props) {
  return <p>Project A:{greeting}</p>
}

function createGraphQLFetcher(host: string | undefined): FetchFunction {
  return async function fetchGraphQL(params, variables) {
    const url = host ? `http://${host}/api/query` : `/api/query`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    })

    return await response.json()
  }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const environment = new Environment({
    store: new Store(new RecordSource({}), {}),
    network: Network.create(createGraphQLFetcher(req.headers.host)),
  })

  const result = await fetchQuery<pagesAQuery>(
    environment,
    graphql`
      query pagesAQuery {
        greeting
      }
    `,
    {}
  ).toPromise()

  if (!result) {
    throw new Error(
      'Mock GraphQL Server network request finished without a response!'
    )
  }

  return {
    props: { greeting: result.greeting },
  }
}
