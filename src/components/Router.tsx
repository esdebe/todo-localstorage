import { HomeScreen } from '@screens/HomeScreen'
import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'

export default createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <HomeScreen />,
      },
    ],
  },
])
