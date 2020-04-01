import { RouteConfig } from 'react-router-config'

import { UsersPage, UserShowPage, UserCreatePage, UserEditPage } from './pages'

export const usersRoutes = (): RouteConfig[] => [
  {
    path: '/users',
    exact: true,
    component: UsersPage,
  },
  {
    path: '/users/new',
    exact: true,
    component: UserCreatePage,
  },
  {
    path: '/users/:userId',
    exact: true,
    component: UserShowPage,
  },
  {
    path: '/users/:userId/edit',
    exact: true,
    component: UserEditPage,
  },
]
