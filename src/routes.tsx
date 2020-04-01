import React, { ReactElement } from 'react'

import {
  renderRoutes,
  RouteConfig,
  RouteConfigComponentProps,
} from 'react-router-config'

import { MainTemplate, Header, Footer } from '@sander/ui'

import { homeRoutes } from './pages/home'
import { articlesRoutes } from './pages/articles'
import { usersRoutes } from './pages/users'

const Root = ({ route }: RouteConfigComponentProps): ReactElement => (
  <MainTemplate header={<Header />} footer={<Footer />}>
    {renderRoutes(route?.routes)}
  </MainTemplate>
)

export const routes: RouteConfig[] = [
  {
    component: Root,
    routes: [...homeRoutes(), ...articlesRoutes(), ...usersRoutes()],
  },
]
