import { createAsyncThunk } from '@reduxjs/toolkit'

import { usersApi, User } from '@api/users'

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async (): Promise<User[]> => await usersApi.getUsers(),
)

export const deleteUser = createAsyncThunk<void, User>(
  'users/deleteUser',
  async (article: User): Promise<void> => usersApi.deleteUserById(article.id),
)
