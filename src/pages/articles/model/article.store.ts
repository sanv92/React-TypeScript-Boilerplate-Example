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
  fetchOneArticleById,
  createArticle,
  updateArticle,
  fetchUsers,
} from './article.effects'
import { initialArticleState, initialUsersState } from './article.state'
import { Article, ArticleState, UsersState, User } from './types'

const articleSlice = createSlice({
  name: 'article',
  initialState: initialArticleState,
  reducers: {
    resetState: (): ArticleState => initialArticleState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<ArticleState>) => {
    builder
      .addCase(fetchOneArticleById.pending, (state: ArticleState) => {
        state.fetching = pendingFetching
      })
      .addCase(
        fetchOneArticleById.fulfilled,
        (state: ArticleState, action: PayloadAction<{ article: Article }>) => {
          state.model = action.payload.article
          state.fetching = succeededFetching
        },
      )
      .addCase(fetchOneArticleById.rejected, (state: ArticleState) => {
        state.fetching = rejectedFetching
      })
      .addCase(
        (createArticle.fulfilled, updateArticle.fulfilled),
        (state: ArticleState, action: PayloadAction<Article>) => {
          state.model = action.payload
        },
      )
  },
})

export const { resetState } = articleSlice.actions
export const articleReducer = articleSlice.reducer

const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user.id,
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(initialUsersState),
  reducers: {
    resetState: (): UsersState => initialUsersState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder
      .addCase(
        fetchOneArticleById.fulfilled,
        (state: UsersState, action: PayloadAction<{ users: User[] }>) => {
          usersAdapter.addMany(state, action.payload.users)
          state.fetching = succeededFetching
        },
      )
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>): void => {
          usersAdapter.addMany(state, action)
          state.fetching = succeededFetching
        },
      )
      .addCase(
        articleSlice.actions.resetState,
        (): UsersState => {
          return initialUsersState
        },
      )
  },
})

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors(
  (state: { articles: { current: { users: EntityState<User> } } }) =>
    state.articles.current.users,
)

export const usersReducer = usersSlice.reducer
