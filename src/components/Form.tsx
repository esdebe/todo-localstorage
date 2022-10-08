import * as React from 'react'
import { useTodo, TodoPriority } from '@lib/todos'
import { useUisStore } from '@lib/ui'
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
  const type = useUisStore((state) => state.type)
  const closeForm = useUisStore((state) => state.closeForm)
  const data = useUisStore((state) => state.data)
  const { addTodo, updateTodo } = useTodo()
  const form = useForm<{ title: string; priority: TodoPriority }>({
    defaultValues: {
      title: type === 'edit' ? data.title : '',
      priority: type === 'edit' ? data.priority : 0,
    },
    resolver: zodResolver(schema),
  })

  const errorTitle = form.formState.errors.title
  const errorPriority = form.formState.errors.priority

  React.useEffect(() => {
    if (data?.id) {
      form.reset({ title: data.title, priority: data.priority })
    } else {
      form.reset({ title: '', priority: 0 })
    }
  }, [data, form])

  return (
    <FormProvider {...form}>
      <form
        className={clsx({ [classes.root]: true })}
        onSubmit={form.handleSubmit((d) => {
          if (type === 'create') {
            addTodo({ title: d.title, priority: d.priority })
          } else {
            updateTodo({ id: data.id, title: d.title, priority: d.priority })
          }
          form.reset()
          closeForm()
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
        <Button className={clsx({ [classes.cancel]: true })} type="button" onClick={closeForm}>
          Cancel
        </Button>
      </form>
    </FormProvider>
  )
}
