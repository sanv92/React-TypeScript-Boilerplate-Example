import { combineReducers } from '@reduxjs/toolkit'

import { usersReducer } from './model/users'
import { userReducer, articlesReducer } from './model/user'

export { usersRoutes } from './routes'

export const userRootReducer = combineReducers({
  all: usersReducer,
  current: combineReducers({
    user: userReducer,
    articles: articlesReducer,
  }),
})
