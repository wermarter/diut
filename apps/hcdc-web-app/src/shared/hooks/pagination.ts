import { useState, useCallback } from 'react'

export type SearchRequestDto = {
  offset?: number
  limit?: number
  sort?: object
  filter?: object
}

export const useCrudPagination = (
  defaultFilter: SearchRequestDto = {
    sort: { createdAt: -1 },
    offset: 0,
  },
) => {
  const [filterObj, setFilterObj] = useState<SearchRequestDto>(defaultFilter)

  const onPageChange = useCallback((page: number) => {
    setFilterObj((oldValue) => {
      return Object.assign({}, oldValue, {
        offset: page,
      })
    })
  }, [])

  const onPageSizeChange = useCallback((pageSize: number) => {
    setFilterObj((oldValue) => {
      return Object.assign({}, oldValue, {
        offset: 0,
        limit: pageSize,
      })
    })
  }, [])

  return {
    filterObj,
    setFilterObj,
    onPageChange,
    onPageSizeChange,
  }
}
