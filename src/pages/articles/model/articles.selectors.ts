import { createSelector } from '@reduxjs/toolkit'

import { Fetching } from '@lib/fetching-api'

export const selectFetching = createSelector(
  (state: { articles: { all: { fetching: Fetching } } }) =>
    state.articles.all.fetching,
  (fetching) => fetching,
)

export const selectFetchingIsLoading = createSelector(
  selectFetching,
  (fetching) => fetching.isLoading,
)
