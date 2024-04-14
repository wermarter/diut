import { AppReduxProvider } from './redux'
import { AppRouterProvider } from './router'
import { AppThemeProvider } from './theme'

export function AppProvider() {
  return (
    <AppThemeProvider>
      <AppReduxProvider>
        <AppRouterProvider />
      </AppReduxProvider>
    </AppThemeProvider>
  )
}
