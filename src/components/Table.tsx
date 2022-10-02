import { useTodo, Todo } from '@lib/todos'
import { useSorter } from '@lib/sorter'
import { Checkbox } from '@components/Checkbox'
import { Sort } from '@components/Sort'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { useSorting } from '@lib/sorting'
import classes from '@components/Table.module.css'

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

const columns = [
  columnHelper.accessor('complete', {
    header: '',
    cell: (info) => <CheckboxCol value={info.row.original} />,
    enableSorting: false,
    sortDescFirst: false,
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

  return (
    <table className={classes.root}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
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
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={classes.content}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
