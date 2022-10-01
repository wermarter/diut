import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App, appConfig } from './core'

appConfig.checkEnvVariables()

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00798c',
      light: '#00798c',
    },
    secondary: {
      main: '#f27815',
      light: '#f27815',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
