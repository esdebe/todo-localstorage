/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTodo, Todo } from '@lib/todos'
import { Button } from '@components/Button'
import { Table } from '@components/Table'
import { Form } from '@components/Form'
import classes from './Screen.module.css'

export function Screen() {
  const { removeTodo, removeCompletedTodo, updateTodo } = useTodo()

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h1 className={classes.title}>Todo</h1>
        <Table />
        <hr className={classes.divider} />
        <Form />
        <hr className={classes.divider} />
        <Button onClick={() => removeCompletedTodo()}>Remove Completed</Button>
        <hr className={classes.divider} />
        <p className={classes.footer}>Navigation: Tab | Shift Tab | Space</p>
      </div>
    </div>
  )
}
