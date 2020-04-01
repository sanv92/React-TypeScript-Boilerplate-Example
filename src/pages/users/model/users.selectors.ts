import { createSelector } from '@reduxjs/toolkit'

import { Fetching } from '@lib/fetching-api'

export const selectFetching = createSelector(
  (state: { users: { all: { fetching: Fetching } } }) =>
    state.users.all.fetching,
  (fetching) => fetching,
)

export const selectFetchingIsLoading = createSelector(
  selectFetching,
  (fetching) => fetching.isLoading,
)
