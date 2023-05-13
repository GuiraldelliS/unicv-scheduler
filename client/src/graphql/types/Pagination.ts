export type IPagination<T> = {
  content?: T[]
  first?: boolean
  last?: boolean
  number?: number
  numberOfElements?: number
  pageable?: {
    offset?: number
    pageNumber?: number
    pageSize?: number
    paged?: boolean
    sort?: {
      unpaged?: boolean
    }
  }
  size?: number
  sort?: {
    DEFAULT_DIRECTION?: string
    empty?: boolean
    sorted?: boolean
    unsorted?: boolean
  }
  totalElements?: number
  totalPages?: number
}

export type IPageableDTOInput = {
  pageNumber?: number
  pageSize?: number
  sortDir?: string
  sortField?: string
}
