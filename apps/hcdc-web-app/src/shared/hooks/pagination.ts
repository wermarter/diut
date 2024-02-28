import { useState, useCallback } from 'react'

import { UserSearchRequestDto } from 'src/infra/api/access-service/user'

export const useCrudPagination = (
  defaultFilter: UserSearchRequestDto = {
    sort: { createdAt: -1 },
    offset: 0,
  },
) => {
  const [filterObj, setFilterObj] =
    useState<UserSearchRequestDto>(defaultFilter)

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
