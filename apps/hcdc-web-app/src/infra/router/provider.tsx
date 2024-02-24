import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { LoadingPage } from 'src/components/layout'
import { appRoutes } from './routes'

export function AppRouterProvider() {
  const appRouter = createBrowserRouter(parseRoutes(appRoutes))

  return <RouterProvider router={appRouter} fallbackElement={<LoadingPage />} />
}
