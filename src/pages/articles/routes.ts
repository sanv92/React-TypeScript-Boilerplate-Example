import { RouteConfig } from 'react-router-config'

import {
  ArticlesPage,
  ArticleShowPage,
  ArticleCreatePage,
  ArticleEditPage,
} from './pages'

export const articlesRoutes = (): RouteConfig[] => [
  {
    path: '/articles',
    exact: true,
    component: ArticlesPage,
  },
  {
    path: '/articles/new',
    exact: true,
    component: ArticleCreatePage,
  },
  {
    path: '/articles/:articleId',
    exact: true,
    component: ArticleShowPage,
  },
  {
    path: '/articles/:articleId/edit',
    exact: true,
    component: ArticleEditPage,
  },
]
