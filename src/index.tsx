import * as React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

import { App } from './app'
import { store } from './store'

import '@sander/ui/themes/default/index.scss'

export const history = createBrowserHistory()

const root = document.querySelector('#root')
const render = (): void => {
  if (root) {
    ReactDom.render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
      root,
    )
  }
}

render()
