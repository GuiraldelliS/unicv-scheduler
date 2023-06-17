import { ApolloClient, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { BACK_END_URL } from '../constants'
import { cache } from './cache'

const httpLink = createHttpLink({
  uri: `${BACK_END_URL}`,
})

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  try {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)

    if (
      networkError &&
      'statusCode' in networkError &&
      networkError.statusCode === 401
    ) {
      console.log('401 error')
      console.log('logout user here')
    }
  } catch (e) {
    console.error(e)
  }
})

export const client = new ApolloClient({
  link: authLink.concat(from([errorLink, httpLink])),
  cache,
})
