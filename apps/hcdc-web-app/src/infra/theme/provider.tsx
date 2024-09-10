import { CssBaseline } from '@mui/material'
import { viVN } from '@mui/material/locale'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type {} from '@mui/x-data-grid/themeAugmentation'
import viLocale from 'date-fns/locale/vi'
import setDefaultOptions from 'date-fns/setDefaultOptions'
import { PropsWithChildren } from 'react'

setDefaultOptions({ locale: viLocale })

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
  viVN,
)

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}
