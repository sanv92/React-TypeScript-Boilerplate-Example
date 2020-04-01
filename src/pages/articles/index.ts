import { combineReducers } from '@reduxjs/toolkit'

import { articlesReducer } from './model/articles'
import { articleReducer, usersReducer } from './model/article'

export { articlesRoutes } from './routes'
export const articleRootReducer = combineReducers({
  all: articlesReducer,
  current: combineReducers({
    article: articleReducer,
    users: usersReducer,
  }),
})
