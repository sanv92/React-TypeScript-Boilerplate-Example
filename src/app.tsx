import React, { ReactElement } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { routes } from './routes'

export const App = (): ReactElement => <Router>{renderRoutes(routes)}</Router>
