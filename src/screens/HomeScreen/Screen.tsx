import * as React from 'react'
import { useTodo } from '@lib/todos'
import { Button } from '@components/Button'
import { Table } from '@components/Table'
import { Form } from '@components/Form'
import classes from './Screen.module.css'

export function Screen() {
  const { removeCompletedTodo, todos } = useTodo()
  const completed = React.useMemo(() => todos.filter((todo) => todo.complete).length, [todos])

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h1 className={classes.title}>Todo</h1>
        <Table />
        <hr className={classes.divider} />
        <Form />
        <hr className={classes.divider} />
        <Button onClick={() => removeCompletedTodo()}>Remove Completed ({completed})</Button>
        <hr className={classes.divider} />
        <p className={classes.footer}>Navigation: Tab | Shift Tab | Space</p>
      </div>
    </div>
  )
}
