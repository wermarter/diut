import { Box, CircularProgress } from '@mui/material'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { appRouter } from './router'
import { appPersistor, appStore } from './store'

const LoadingPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  )
}

export function App() {
  return (
    <ReduxProvider store={appStore}>
      <PersistGate persistor={appPersistor} loading={<LoadingPage />}>
        <RouterProvider router={appRouter} fallbackElement={<LoadingPage />} />
      </PersistGate>
    </ReduxProvider>
  )
}