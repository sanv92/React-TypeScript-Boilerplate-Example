import { RouteConfig } from 'react-router-config'

import { HomePage } from './page'

export const homeRoutes = (): RouteConfig[] => [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
]
