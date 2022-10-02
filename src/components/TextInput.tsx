import * as React from 'react'
import { useInput } from '@mui/base'
import { unstable_useForkRef as useForkRef } from '@mui/utils'
import classes from '@components/TextInput.module.css'
import clsx from 'clsx'

type EndAdornment = {
  endAdornment: React.ReactNode
  className?: string
}

export const TextInput = React.forwardRef(
  (
    props: React.InputHTMLAttributes<HTMLInputElement> & EndAdornment,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { endAdornment, className, ...restProps } = props
    const { getRootProps, getInputProps } = useInput(restProps)

    const inputProps = getInputProps()

    inputProps.ref = useForkRef(inputProps.ref, ref)

    return (
      <div
        {...getRootProps()}
        className={clsx({ [classes.root]: true, [`${className}`]: className })}
      >
        <input {...restProps} {...inputProps} className={classes.input} />
        {endAdornment}
      </div>
    )
  }
)
