// import React from 'react'
import ReactDOM from 'react-dom/client'

import { checkEnvVariables } from './config'
import { AppProvider } from './infra'

checkEnvVariables()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <AppProvider />,
  // </React.StrictMode>,
)
