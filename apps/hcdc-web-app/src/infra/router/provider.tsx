import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { LoadingPage } from 'src/components/layout/LoadingPage'

export function AppRouterProvider() {
  const appRouter = createBrowserRouter(parseRoutes(appRoutes))

  return <RouterProvider router={appRouter} fallbackElement={<LoadingPage />} />
}
