import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityState,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'

import {
  succeededFetching,
  pendingFetching,
  rejectedFetching,
} from '@lib/fetching-api'

import { fetchArticles, deleteArticle } from './articles.effects'
import { initialState } from './articles.state'
import { Article, ArticlesState } from './types'

const articlesAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState(initialState),
  reducers: {
    resetState: (): ArticlesState => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<ArticlesState>) => {
    builder
      .addCase(fetchArticles.pending, (state: ArticlesState) => {
        state.fetching = pendingFetching
      })
      .addCase(
        fetchArticles.fulfilled,
        (state: ArticlesState, action: PayloadAction<Article[]>) => {
          articlesAdapter.addMany(state, action)
          state.fetching = succeededFetching
        },
      )
      .addCase(fetchArticles.rejected, (state: ArticlesState) => {
        state.fetching = rejectedFetching
      })
      .addCase(deleteArticle.fulfilled, (state: ArticlesState, action) => {
        articlesAdapter.removeOne(state, action.meta.arg.id)
      })
  },
})

export const { resetState } = articlesSlice.actions
export const {
  selectById: selectArticleById,
  selectIds: selectArticleIds,
  selectEntities: selectArticleEntities,
  selectAll: selectAllArticles,
  selectTotal: selectTotalArticles,
} = articlesAdapter.getSelectors(
  (state: { articles: { all: EntityState<Article> } }) => state.articles.all,
)

export const articlesReducer = articlesSlice.reducer
