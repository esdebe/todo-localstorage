import * as React from 'react'
import { useTodo } from '@lib/todos'
import { useUisStore } from '@lib/ui'
import { Button } from '@components/Button'
import { Table } from '@components/Table'
import { Form } from '@components/Form'
import classes from './Screen.module.css'

export function Screen() {
  const { removeCompletedTodo, todos } = useTodo()
  const form = useUisStore((state) => state.form)
  const createForm = useUisStore((state) => state.createForm)
  const completed = React.useMemo(() => todos.filter((todo) => todo.complete).length, [todos])

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h1 className={classes.title}>Todo</h1>
        <Table />
        <hr className={classes.divider} />
        <div className={classes.col}>
          <Button onClick={() => removeCompletedTodo()}>
            Remove Completed ({completed}/{todos.length})
          </Button>
          <hr className={classes.dividerVertical} />
          <Button onClick={createForm}>Add New</Button>
        </div>
        <hr className={classes.divider} />
        {form && (
          <React.Fragment>
            <Form />
            <hr className={classes.divider} />
          </React.Fragment>
        )}
        <p className={classes.footer}>Navigation: Tab | Shift Tab | Space</p>
      </div>
    </div>
  )
}
