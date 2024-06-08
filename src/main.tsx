import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout.tsx'
import IndexPage from './routes/index.tsx'
import Dashboard from './routes/dashboard.tsx'
import SignInPage from './routes/sign-in.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
        ],
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
      <RouterProvider router={router}/>
        
    
  </React.StrictMode>,
)
