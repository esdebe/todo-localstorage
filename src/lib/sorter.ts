import * as React from 'react'
import orderBy from 'lodash/orderBy'

export function useSorter(todos: any, sorting: any) {
  const sorted = React.useMemo(() => {
    let sort = []
    let order = []
    let val = todos
    sort = Object.keys(sorting ?? {})
    order = Object.values<'asc' | 'desc'>(sorting ?? {})
    val = orderBy(val, sort, order)
    return val
  }, [todos, sorting])
  return sorted
}
