/* eslint-disable @typescript-eslint/no-unused-vars */
import { useButton } from '@mui/base'
import classes from '@components/Sort.module.css'

import { useSorting } from '@lib/sorting'
import clsx from 'clsx'

export function Sort(props: any) {
  const [sorting, setSorting]: any = useSorting()
  const asc = useButton({})
  const desc = useButton({})

  const { header } = props

  return (
    <div className={classes.root}>
      <button
        {...asc.getRootProps()}
        className={clsx({
          [classes.button]: true,
          [classes.buttonFocus]: asc.focusVisible,
          [classes.buttonActive]: sorting?.[header?.id] === 'asc',
        })}
        type="button"
        onClick={() => setSorting({ id: header.id, order: 'asc' })}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classes.svg}>
          <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </button>
      <button
        {...desc.getRootProps()}
        className={clsx({
          [classes.button]: true,
          [classes.buttonFocus]: desc.focusVisible,
          [classes.buttonActive]: sorting?.[header?.id] === 'desc',
        })}
        type="button"
        onClick={() => setSorting({ id: header.id, order: 'desc' })}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className={classes.svg}>
          <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
    </div>
  )
}
