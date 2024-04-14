import { PropsWithChildren } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { appStorePersistor, appStore } from './store'
import { LoadingPage } from 'src/components/layout'

export function AppReduxProvider({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={appStore}>
      <PersistGate persistor={appStorePersistor}>
        {(bootstrapped) => {
          if (!bootstrapped) {
            return <LoadingPage />
          }

          return children
        }}
      </PersistGate>
    </ReduxProvider>
  )
}
