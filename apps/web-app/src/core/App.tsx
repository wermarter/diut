import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { LoadingPage } from 'src/common/layout/LoadingPage'
import { parseRoutes } from 'src/common/utils'
import { appRoutes } from './routes'
import { appPersistor, appStore } from './store'

export function App() {
  return (
    <ReduxProvider store={appStore}>
      <PersistGate persistor={appPersistor}>
        {(bootstrapped) => {
          if (!bootstrapped) {
            return <LoadingPage />
          }

          // Lạy cụ đừng loaderFunction, đợi thằng Redux Persist Provider giúp em...
          const appRouter = createBrowserRouter(parseRoutes(appRoutes))
          return (
            <RouterProvider
              router={appRouter}
              fallbackElement={<LoadingPage />}
            />
          )
        }}
      </PersistGate>
    </ReduxProvider>
  )
}
