import { UseSwitchParameters, useSwitch } from '@mui/base'
import clsx from 'clsx'
import { LazyMotion, domAnimation, m as motion } from 'framer-motion'
import classes from '@components/Checkbox.module.css'

interface Props {
  label?: string
}

function Checkbox(props: UseSwitchParameters & Props) {
  const { label = '', ...switchProps } = props
  const { checked, getInputProps, focusVisible } = useSwitch(switchProps)
  return (
    <LazyMotion features={domAnimation}>
      <span className={classes.root}>
        <input className={classes.input} aria-label={label} {...getInputProps()} />
        <span
          className={clsx({
            [classes.track]: true,
            [classes.trackFocusVisible]: focusVisible,
            focusVisible,
          })}
        />
        <motion.svg viewBox="0 0 24 24" className={classes.svg} strokeWidth={2} fill="none">
          <motion.path
            initial={false}
            animate={checked ? 'checked' : 'notChecked'}
            transition={{ delay: 0.05, type: 'tween', ease: 'easeOut' }}
            variants={{
              checked: {
                pathLength: 1,
                stroke: 'currentColor',
                opacity: 1,
              },
              notChecked: {
                pathLength: 0,
                stroke: 'currentColor',
                opacity: 0,
              },
            }}
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>
    </LazyMotion>
  )
}

export { Checkbox }
