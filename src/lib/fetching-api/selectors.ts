import { createSelector } from '@reduxjs/toolkit'

import { Fetching } from './types'

export const selectFetching = createSelector(
  (state: { fetching: Fetching }) => state.fetching,
  (fetching) => fetching,
)

export const selectFetchingIsLoading = createSelector(
  selectFetching,
  (fetching) => fetching.isLoading,
)
