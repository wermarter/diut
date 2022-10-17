import * as React from 'react'

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
  }
) => {
  const [filterObj, setFilterObj] =
    React.useState<SearchRequestDto>(defaultFilter)
  const onPageChange = React.useCallback(
    (page: number) => {
      setFilterObj((oldValue) => {
        return Object.assign({}, oldValue, {
          offset: page,
        })
      })
    },
    [setFilterObj]
  )

  const onPageSizeChange = React.useCallback(
    (pageSize: number) => {
      setFilterObj((oldValue) => {
        return Object.assign({}, oldValue, {
          offset: 0,
          limit: pageSize,
        })
      })
    },
    [setFilterObj]
  )

  return {
    filterObj,
    setFilterObj,
    onPageChange,
    onPageSizeChange,
  }
}
