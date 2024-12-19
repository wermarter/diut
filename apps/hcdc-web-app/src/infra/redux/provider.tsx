import { PropsWithChildren } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { LoadingPage } from 'src/components/layout'
import { appStore, appStorePersistor } from './store'

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
