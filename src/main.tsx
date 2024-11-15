import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/error-page/index.tsx'
import IssuesPage from './routes/issues/index.tsx'
import LogsPage from './routes/logs/index.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to='/issues' replace />
      },
      {
        path: '/issues',
        element: <IssuesPage />
      },
      {
        path: '/logs',
        element: <LogsPage />
      }
    ]
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>,
)
