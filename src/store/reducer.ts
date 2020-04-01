import { combineReducers } from '@reduxjs/toolkit'

import { articleRootReducer } from 'pages/articles'
import { userRootReducer } from 'pages/users'

export const rootReducer = combineReducers({
  articles: articleRootReducer,
  users: userRootReducer,
})
