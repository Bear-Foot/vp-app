import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Router } from 'react-router-dom'

import { store } from './redux/store'
import { App } from './App'

const history = createHistory()

const theme = {
  main: 'dodgerblue',
  secondary: 'palevioletred',
  menuHeight: 40,
}

export const Providers = () => (
  <StoreProvider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
  </StoreProvider>
)
