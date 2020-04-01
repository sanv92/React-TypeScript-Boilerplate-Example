import { createSelector } from '@reduxjs/toolkit'

import { Fetching } from '@lib/fetching-api'

import { User } from './types'

export const selectFetching = createSelector(
  (state: { users: { current: { user: { fetching: Fetching } } } }) =>
    state.users.current.user.fetching,
  (fetching) => fetching,
)

export const selectFetchingIsLoading = createSelector(
  selectFetching,
  (fetching) => fetching.isLoading,
)

export const selectUserModel = createSelector(
  (state: { users: { current: { user: { model: User } } } }) =>
    state.users.current.user.model,
  (model) => model,
)
