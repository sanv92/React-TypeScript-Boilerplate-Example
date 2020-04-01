import {
  ActionReducerMapBuilder,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'

import {
  succeededFetching,
  pendingFetching,
  rejectedFetching,
} from '@lib/fetching-api'

import {
  fetchOneUserById,
  createUser,
  updateUser,
  deleteArticle,
} from './user.effects'
import { initialArticlesState, initialUserState } from './user.state'
import { User, Article, UserState, ArticlesState } from './types'

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    resetState: (): UserState => initialUserState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(fetchOneUserById.pending, (state: UserState): void => {
        state.fetching = pendingFetching
      })
      .addCase(
        fetchOneUserById.fulfilled,
        (state: UserState, action: PayloadAction<{ user: User }>): void => {
          state.model = action.payload.user
          state.fetching = succeededFetching
        },
      )
      .addCase(fetchOneUserById.rejected, (state: UserState): void => {
        state.fetching = rejectedFetching
      })
      .addCase(
        (createUser.fulfilled, updateUser.fulfilled),
        (state: UserState, action: PayloadAction<User>) => {
          state.model = action.payload
        },
      )
  },
})

export const { resetState } = userSlice.actions
export const userReducer = userSlice.reducer

const articlesAdapter = createEntityAdapter({
  selectId: (article: Article) => article.id,
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState(initialArticlesState),
  reducers: {
    resetState: (): ArticlesState => initialArticlesState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<ArticlesState>) => {
    builder
      .addCase(
        fetchOneUserById.fulfilled,
        (
          state: ArticlesState,
          action: PayloadAction<{ articles: Article[] }>,
        ): void => {
          articlesAdapter.addMany(state, action.payload.articles)
          state.fetching = succeededFetching
        },
      )
      .addCase(
        userSlice.actions.resetState,
        (): ArticlesState => {
          return initialArticlesState
        },
      )
      .addCase(deleteArticle.fulfilled, (state: ArticlesState, action) => {
        articlesAdapter.removeOne(state, action.meta.arg.id)
      })
  },
})

export const {
  selectById: selectArticleById,
  selectIds: selectArticleIds,
  selectEntities: selectArticleEntities,
  selectAll: selectAllArticles,
  selectTotal: selectTotalArticles,
} = articlesAdapter.getSelectors(
  (state: { users: { current: { articles: EntityState<Article> } } }) =>
    state.users.current.articles,
)

export const articlesReducer = articlesSlice.reducer
