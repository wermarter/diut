import viLocale from 'date-fns/locale/vi'
import setDefaultOptions from 'date-fns/setDefaultOptions'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { viVN } from '@mui/material/locale'
import type {} from '@mui/x-data-grid/themeAugmentation'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App, appConfig } from './core'

setDefaultOptions({ locale: viLocale })
appConfig.checkEnvVariables()

const appTheme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#00798c',
        light: '#00798c',
      },
      secondary: {
        main: '#E27a1d',
        light: '#E27a1d',
      },
    },
  },
  viVN
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
