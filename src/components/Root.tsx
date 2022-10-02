import { Outlet } from 'react-router-dom'
import classes from './Root.module.css'

function Root() {
  return (
    <div className={classes.root}>
      <div className={classes.background} />
      <Outlet />
    </div>
  )
}

export default Root
