import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit'

import { ThunkAction } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { rootReducer } from './reducer'

const DEV_ENV = process.env.NODE_ENV === 'development'

const loggerOptions = {
  predicate: (): boolean => DEV_ENV,
  collapsed: true,
}

export type RootState = ReturnType<typeof rootReducer>

const middleware = [
  ...getDefaultMiddleware<RootState>(),
  createLogger(loggerOptions),
]

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: DEV_ENV,
})

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
