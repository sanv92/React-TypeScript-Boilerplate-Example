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

import { fetchUsers, deleteUser } from './users.effects'
import { initialState } from './users.state'
import { User, UsersState } from './types'

const usersAdapter = createEntityAdapter({
  selectId: (user: User) => user.id,
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(initialState),
  reducers: {
    resetState: (): UsersState => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState): void => {
        state.fetching = pendingFetching
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>): void => {
          usersAdapter.addMany(state, action)
          state.fetching = succeededFetching
        },
      )
      .addCase(fetchUsers.rejected, (state: UsersState): void => {
        state.fetching = rejectedFetching
      })
      .addCase(deleteUser.fulfilled, (state: UsersState, action): void => {
        usersAdapter.removeOne(state, action.meta.arg.id)
      })
  },
})

export const { resetState } = usersSlice.actions
export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors(
  (state: { users: { all: EntityState<User> } }) => state.users.all,
)

export const usersReducer = usersSlice.reducer
