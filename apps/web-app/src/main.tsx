import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import viLocale from 'date-fns/locale/vi'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { viVN } from '@mui/material/locale'
import type {} from '@mui/x-data-grid/themeAugmentation'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App, appConfig } from './core'

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
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={viLocale}
      >
        <CssBaseline enableColorScheme />
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
)
