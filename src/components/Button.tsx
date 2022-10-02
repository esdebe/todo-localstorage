import * as React from 'react'
import { useButton, ButtonUnstyledProps } from '@mui/base'
import clsx from 'clsx'
import classes from '@components/Button.module.css'

export const Button = React.forwardRef(
  (props: ButtonUnstyledProps, ref: React.ForwardedRef<any>) => {
    const { children, className, title, ...restProps } = props
    const { focusVisible, getRootProps, active } = useButton({
      ...restProps,
      ref,
    })

    return (
      <button
        title={title}
        type="button"
        {...getRootProps()}
        className={clsx({
          [classes.root]: true,
          [classes.focusVisible]: focusVisible,
          [classes.active]: active,
          [`${className}`]: className,
        })}
      >
        <span className={clsx({ [classes.ripple]: true, [classes.activeRipple]: active })} />
        {children}
      </button>
    )
  }
)
