import { useState, useCallback } from 'react'

import { UserSearchRequestDto } from 'src/infra/api/access-service/user'

export const useCrudPagination = (
  defaultFilter: UserSearchRequestDto = {
    sort: { createdAt: -1 },
    offset: 0,
  },
  onPageChangeHook?: (page: number) => void,
  onPageSizeChangeHook?: (pageSize: number) => void,
) => {
  const [filterObj, setFilterObj] =
    useState<UserSearchRequestDto>(defaultFilter)

  const onPageChange = useCallback(
    (page: number) => {
      if (onPageChangeHook) {
        onPageChangeHook(page)
      }
      setFilterObj((oldValue) => {
        return Object.assign({}, oldValue, {
          offset: page,
        })
      })
    },
    [onPageChangeHook],
  )

  const onPageSizeChange = useCallback(
    (pageSize: number) => {
      if (onPageSizeChangeHook && onPageChangeHook) {
        onPageSizeChangeHook(pageSize)
        onPageChange(0)
      }
      setFilterObj((oldValue) => {
        return Object.assign({}, oldValue, {
          offset: 0,
          limit: pageSize,
        })
      })
    },
    [onPageSizeChangeHook, onPageChangeHook],
  )

  return {
    filterObj,
    setFilterObj,
    onPageChange,
    onPageSizeChange,
  }
}
