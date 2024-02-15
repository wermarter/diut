import React from 'react'
import ReactDOM from 'react-dom/client'

import { checkEnvVariables } from './config'
import { AppThemeProvider } from './infra/theme/provider'
import { AppReduxProvider } from './infra/redux/provider'
import { AppRouterProvider } from './infra/router/provider'

checkEnvVariables()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AppThemeProvider>
      <AppReduxProvider>
        <AppRouterProvider />
      </AppReduxProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)
