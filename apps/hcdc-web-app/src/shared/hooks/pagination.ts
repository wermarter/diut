import { useState, useEffect, useCallback } from 'react'

export const usePagination = <T extends { limit?: number; offset?: number }>(
  currentFilterObj: T,
) => {
  const [filterObj, setFilterObj] = useState<T>(currentFilterObj)

  useEffect(() => {
    setFilterObj((oldValue: any) => {
      return Object.assign({}, oldValue, {
        limit: currentFilterObj.limit,
      })
    })
  }, [currentFilterObj.limit])

  useEffect(() => {
    setFilterObj((oldValue: any) => {
      return Object.assign({}, oldValue, {
        offset: currentFilterObj.offset,
      })
    })
  }, [currentFilterObj.offset])

  const onPageChange = useCallback((page: number) => {
    setFilterObj((oldValue: any) => {
      return Object.assign({}, oldValue, {
        offset: page,
      })
    })
  }, [])

  const onPageSizeChange = useCallback((pageSize: number) => {
    setFilterObj((oldValue: any) => {
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
