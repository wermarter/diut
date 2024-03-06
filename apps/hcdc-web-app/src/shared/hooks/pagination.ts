import { useState, useEffect, useCallback } from 'react'

import { UserSearchRequestDto } from 'src/infra/api/access-service/user'

export const usePagination = (
  currentFilterObj: UserSearchRequestDto = {
    offset: 0,
    limit: 10,
  },
) => {
  const [filterObj, setFilterObj] =
    useState<UserSearchRequestDto>(currentFilterObj)

  useEffect(() => {
    setFilterObj((oldValue) => {
      return Object.assign({}, oldValue, {
        limit: currentFilterObj.limit,
      })
    })
  }, [currentFilterObj.limit])

  useEffect(() => {
    setFilterObj((oldValue) => {
      return Object.assign({}, oldValue, {
        offset: currentFilterObj.offset,
      })
    })
  }, [currentFilterObj.offset])

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
