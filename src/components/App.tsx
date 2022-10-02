import * as React from 'react'
import { RouterProvider } from 'react-router-dom'
import { useTodosStore } from '@lib/todos'
import '@components/App.css'
import Router from '@components/Router'

function App() {
  const [todosHydrated, setTodosHydrated] = React.useState(false)

  React.useEffect(() => {
    const todosOnFinishHydrateSubs = useTodosStore.persist.onFinishHydration(() =>
      setTodosHydrated(true)
    )
    setTodosHydrated(useTodosStore.persist.hasHydrated())
    return () => {
      todosOnFinishHydrateSubs()
    }
  }, [])

  return todosHydrated ? <RouterProvider router={Router} /> : null
}

export default App
