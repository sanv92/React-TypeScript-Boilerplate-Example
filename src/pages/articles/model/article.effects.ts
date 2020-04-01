import { createAsyncThunk } from '@reduxjs/toolkit'

import { articlesApi } from '@api/articles'
import { User, usersApi } from '@api/users'

import { Article } from './types'

export const fetchOneArticleById = createAsyncThunk<
  { article: Article; users: User[] },
  number
>(
  'article/fetchOneArticleById',
  async (articleId: number): Promise<{ article: Article; users: User[] }> => {
    const [article, users] = await Promise.all([
      await articlesApi.getArticleById(articleId),
      usersApi.getUsers(),
    ])

    return { article, users }
  },
)

export const createArticle = createAsyncThunk<Article, Article>(
  'article/createArticle',
  async (article: Article): Promise<Article> =>
    await articlesApi.saveArticle(article),
)

export const updateArticle = createAsyncThunk<Article, Article>(
  'article/updateArticle',
  async (article: Article): Promise<Article> =>
    await articlesApi.updateArticle(article.id, article),
)

export const fetchUsers = createAsyncThunk<User[], void>(
  'article/fetchUsers',
  async (): Promise<User[]> => await usersApi.getUsers(),
)
