import { FieldFunctionOptions, InMemoryCache } from '@apollo/client/cache'
import { IPagination } from '../../graphql/types'

const defaultMergePagination = (
  existing: IPagination<any> | undefined | any,
  incoming: IPagination<any> | any,
  options: FieldFunctionOptions<Record<string, any>>
) => {
  const { variables } = options || {}
  const pageNumber = incoming?.number || variables?.pageableDTO?.pageNumber

  if (!existing || pageNumber === 0) return incoming
  if (existing?.content.length == existing?.totalElements) return existing
  return {
    ...incoming,
    content: [...existing.content, ...incoming.content],
  }
}

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        findAllDepartment: {
          keyArgs: ['search'],
          merge: defaultMergePagination,
        },
      },
    },
  },
})
