import React, { useEffect, useState } from 'react'
import Select from '../Select'

import { useQuery } from '@apollo/client'

type Props = Omit<React.ComponentProps<typeof Select>, 'options'> & {
  asyncConfig: {
    query: Parameters<typeof useQuery>[0]
    queryName?: string
    refetchOnSearch?: boolean

    getVariables?: ({
      pageableDTO,
      search,
    }: {
      pageableDTO: { pageNumber: number; pageSize: number }
      search: string
    }) => object
  }
}

type QueryDefinition = {
  selectionSet?: {
    selections?: {
      name?: {
        name?: string
        value?: string
      }
    }[]
  }
}

const DEFAULT_PAGE_SIZE = 10

const AsyncSelect = ({ asyncConfig, ...rest }: Props) => {
  const [page, setPage] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searching, setSearching] = useState(false)
  const [search, setSearch] = useState('')
  const [shouldLoadInitial, setShouldLoadInitial] = useState(false)

  const getVariables = (nextPage = page) => {
    if (asyncConfig.getVariables) {
      return asyncConfig.getVariables?.({
        pageableDTO: {
          pageNumber: nextPage,
          pageSize: DEFAULT_PAGE_SIZE,
        },
        search,
      })
    }

    return {
      pageableDTO: {
        pageNumber: page,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    }
  }

  const { data, loading, error, fetchMore, refetch } = useQuery(
    asyncConfig.query,
    {
      variables: getVariables(0),
      skip: !shouldLoadInitial,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    }
  )

  const getQueryNameByQuery = () => {
    const { query } = asyncConfig
    const definitions = query.definitions as unknown as QueryDefinition[]
    const definition = definitions[0] as any

    if (definition?.selectionSet?.selections[0]?.name?.value) {
      return definition.selectionSet.selections[0].name.value
    } else if (asyncConfig.queryName) {
      return asyncConfig.queryName
    } else {
      throw new Error(
        'Its not possible to get query name, please provide a queryName in asyncConfig'
      )
    }
  }

  const queryKey = getQueryNameByQuery()
  const response = data?.[queryKey]

  const hasMore = !response?.last
  const options = response?.content || []

  const onEndReached = () => {
    if (hasMore && !loading && !loadingMore && !error) {
      setLoadingMore(true)
      fetchMore({
        variables: getVariables(page + 1),
      })
      setLoadingMore(false)
      setPage(page + 1)
    }
  }

  const handleScroll = async (e: any) => {
    const bottom =
      Math.floor(e.target.scrollHeight - e.target.scrollTop) ==
      e.target.clientHeight

    if (bottom) {
      onEndReached()
    }
  }

  const onChangeSearch = (e: any) => {
    if (!asyncConfig.refetchOnSearch) return
    setSearching(true)
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (searching && !loading) {
      setSearching(false)
    }
  }, [loading])

  useEffect(() => {
    if (!asyncConfig.refetchOnSearch || !search) return
    const delayDebounceFn = setTimeout(async () => {
      await refetch(getVariables(0))
      setPage(0)
      setSearching(false)
    }, 200)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  return (
    <Select
      {...rest}
      isLoading={loading || loadingMore}
      onInputChange={onChangeSearch}
      options={options}
      onOpen={() => {
        if (!shouldLoadInitial) {
          setShouldLoadInitial(true)
        }
      }}
      overrides={{
        Dropdown: {
          props: {
            onScroll: handleScroll,
          },
        },
      }}
    />
  )
}

export default AsyncSelect
