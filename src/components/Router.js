import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'

const App = React.lazy(() => import('../App'))
const HomePage = React.lazy(() => import('./Home'))
const Product = React.lazy(() => import('./Products'))
const Inventory = React.lazy(() => import('./Inventory'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products',
        element: <Product />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/inventory',
        element: <Inventory />,
        errorElement: <ErrorPage />,
      },
    ],
  },
])

export default router
