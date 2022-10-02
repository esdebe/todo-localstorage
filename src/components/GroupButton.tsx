import { todoPriority } from '@lib/todos'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import classes from '@components/GroupButton.module.css'
import { Button } from '@components/Button'

export function GroupButton({ className }: { className?: string }) {
  const { register, setValue, watch } = useFormContext()
  const name = 'priority'
  const active = watch(name)
  const values = [todoPriority.high, todoPriority.medium, todoPriority.low]
  const labels = ['H', 'M', 'L']
  const titles = ['High', 'Medium', 'Low']
  return (
    <div className={clsx({ [classes.root]: true, [`${className}`]: className })}>
      <input type="hidden" {...register(name)} />
      {values.map((val) => (
        <Button
          key={`${val}`}
          title={titles[val - 1]}
          className={clsx({ [classes.selected]: val === active })}
          onClick={() => setValue(name, val, { shouldValidate: true })}
        >
          {labels[val - 1]}
        </Button>
      ))}
    </div>
  )
}
