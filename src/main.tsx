import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout.tsx'
import IndexPage from './routes/index.tsx'
import Dashboard from './routes/dashboard.tsx'
import SignInPage from './routes/sign-in.tsx'
import ChatLayout from './layouts/chat-layout.tsx'
import Chat from './routes/chat.tsx'

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
      },
      {
        element: <ChatLayout />,
        children: [
          {
            path: 'chat/:id',
            element: <Chat />,
          },
        ],
      },
    ],
  }
])

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>     
  </React.StrictMode>,
)
