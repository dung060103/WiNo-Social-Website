import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import './css/index.css'
import './css/main.css'
import App from './js/App'
import { theme } from './theme'

import reportWebVitals from './reportWebVitals'
import { ProviderPopUpContent } from '@store'
import { ProviderAccount } from '@store/Provider'
import { createRequest } from '@utils/requests'
async function run() {
  var scriptCaptcha = document.createElement('script')
  scriptCaptcha.src = 'https://www.google.com/recaptcha/api.js'
  scriptCaptcha.async = 1
  scriptCaptcha.defer = 1
  document.body.appendChild(scriptCaptcha)

  let isLoginEd = false

  isLoginEd = await createRequest('GET', '/account/check-is-active')

  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    // <React.StrictMode>
    <ProviderPopUpContent>
      <ProviderAccount>
        <ThemeProvider theme={theme}>
          <App result={isLoginEd} />
        </ThemeProvider>
      </ProviderAccount>
    </ProviderPopUpContent>,
    // {/* </React.StrictMode> */}
  )
}
run()
reportWebVitals()
