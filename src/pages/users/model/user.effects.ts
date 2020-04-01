import { createAsyncThunk } from '@reduxjs/toolkit'

import { usersApi, User } from '@api/users'
import { articlesApi, Article } from '@api/articles'

export const fetchOneUserById = createAsyncThunk<
  { user: User; articles: Article[] },
  number
>(
  'users/fetchOneUserById',
  async (userId: number): Promise<{ user: User; articles: Article[] }> => {
    const [user, articles] = await Promise.all([
      usersApi.getUserById(userId),
      articlesApi.getArticlesFilter({
        userId,
      }),
    ])

    return { user, articles }
  },
)

export const createUser = createAsyncThunk<User, User>(
  'users/createUser',
  async (user: User): Promise<User> => await usersApi.saveUser(user),
)

export const updateUser = createAsyncThunk<User, User>(
  'users/updateUser',
  async (user: User): Promise<User> => await usersApi.updateUser(user.id, user),
)

export const deleteArticle = createAsyncThunk<void, Article>(
  'users/deleteArticles',
  async (article: Article): Promise<void> =>
    articlesApi.deleteArticleById(article.id),
)
