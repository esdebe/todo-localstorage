import * as React from 'react'
import { useTodo, Todo } from '@lib/todos'
import { useSorter } from '@lib/sorter'
import { Checkbox } from '@components/Checkbox'
import { Sort } from '@components/Sort'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  HeaderGroup,
  Cell,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { useSorting } from '@lib/sorting'
import classes from '@components/Table.module.css'
import { Button } from '@components/Button'

const columnHelper = createColumnHelper<Todo>()

function TitleCol(props: any) {
  const { info } = props
  return (
    <span className={clsx({ [classes.completed]: info.row.original.complete })}>
      {info.row.original.title}
    </span>
  )
}

function CheckboxCol(props: any) {
  const { value } = props
  const { updateTodo } = useTodo()
  return (
    <Checkbox
      checked={value.complete}
      onChange={() => updateTodo({ id: value.id, complete: !value.complete })}
    />
  )
}

function DeleteCol(props: any) {
  const { info } = props
  const { removeTodo } = useTodo()
  return (
    <Button className={classes.deleteButton} onClick={() => removeTodo(info.row.original.id)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="DeleteOutlineIcon"
        aria-label="fontSize large"
      >
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </Button>
  )
}

const columns = [
  columnHelper.display({
    id: 'radio',
    cell: (info) => <CheckboxCol value={info.row.original} />,
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => <TitleCol info={info}>{info}</TitleCol>,
    sortDescFirst: false,
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => ({ 1: 'High', 2: 'Medium', 3: 'Low', 0: 'Not Set' }[info.getValue()]),
  }),
  columnHelper.display({
    id: 'del',
    cell: (info) => <DeleteCol info={info} />,
  }),
]

export function Table() {
  const [sorting] = useSorting()
  const { todos } = useTodo()
  const sorted = useSorter(todos, sorting)

  const table = useReactTable({
    data: sorted,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  })

  const renderBodyContent = React.useCallback(
    (cell: Cell<Todo, unknown>) => (
      <td key={cell.id} className={classes.content}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ),
    []
  )

  const renderHead = React.useCallback(
    (headerGroup: HeaderGroup<Todo>) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) =>
          header.column.columnDef.header === '' ? null : (
            <th
              key={header.id}
              colSpan={header.column.columnDef.header === 'Title' ? 2 : undefined}
            >
              <div className={classes.header}>
                <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                {header.column.getCanSort() && <Sort header={header} />}
              </div>
            </th>
          )
        )}
      </tr>
    ),
    []
  )

  return (
    <table className={classes.root}>
      <thead>{table.getHeaderGroups().map(renderHead)}</thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>{row.getVisibleCells().map(renderBodyContent)}</tr>
        ))}
      </tbody>
    </table>
  )
}
