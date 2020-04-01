import { createSelector } from '@reduxjs/toolkit'

import { Fetching } from '@lib/fetching-api'

import { Article } from './types'

export const selectFetching = createSelector(
  (state: { articles: { current: { article: { fetching: Fetching } } } }) =>
    state.articles.current.article.fetching,
  (fetching) => fetching,
)

export const selectFetchingIsLoading = createSelector(
  selectFetching,
  (fetching) => fetching.isLoading,
)

export const selectArticleModel = createSelector(
  (state: { articles: { current: { article: { model: Article } } } }) =>
    state.articles.current.article.model,
  (model) => model,
)
