import { useTodo, TodoPriority } from '@lib/todos'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import clsx from 'clsx'

import { TextInput } from '@components/TextInput'
import { Button } from '@components/Button'
import { GroupButton } from '@components/GroupButton'

import classes from '@components/Form.module.css'

const schema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  priority: z.number().min(1, { message: 'Required' }),
})

export function Form() {
  const { addTodo } = useTodo()
  const form = useForm<{ title: string; priority: TodoPriority }>({
    defaultValues: {
      title: '',
      priority: 0,
    },
    resolver: zodResolver(schema),
  })

  const errorTitle = form.formState.errors.title
  const errorPriority = form.formState.errors.priority

  return (
    <FormProvider {...form}>
      <form
        className={clsx({ [classes.root]: true })}
        onSubmit={form.handleSubmit((d) => {
          addTodo({ title: d.title, priority: d.priority })
          form.reset()
        })}
      >
        <TextInput
          className={clsx({
            [classes.errorTitle]: errorTitle || errorPriority,
          })}
          {...form.register('title')}
          placeholder="Whats Next ?"
          endAdornment={<GroupButton />}
        />
        <Button className={clsx({ [classes.submit]: true })} type="submit">
          Save
        </Button>
      </form>
    </FormProvider>
  )
}
