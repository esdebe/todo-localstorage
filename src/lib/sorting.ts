import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import qs from 'qs'

type Order = 'asc' | 'desc'

type SortKey = 'priority' | 'title'

export const useSorting = (): [any, () => void] => {
  const [searchParams, setSearchParams] = useSearchParams()

  const q = useMemo<any>(() => {
    const val = qs.parse(searchParams.toString())
    return val
  }, [searchParams])

  const sorting = q.sort

  const setSorting = useCallback(
    (params?: { id: SortKey; order: Order }) => {
      if (params?.id && params?.order) {
        const next: any = {}
        if (sorting?.[params?.id] !== params?.order) {
          next[params.id] = params.order
        }
        setSearchParams(qs.stringify({ sort: next }))
      }
    },
    [setSearchParams, sorting]
  )

  return [sorting, setSorting]
}
