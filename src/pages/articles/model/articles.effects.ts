import { createAsyncThunk } from '@reduxjs/toolkit'

import { articlesApi, Article } from '@api/articles'

export const fetchArticles = createAsyncThunk<Article[], void>(
  'articles/fetchArticles',
  async (): Promise<Article[]> => await articlesApi.getArticles(),
)

export const deleteArticle = createAsyncThunk<void, Article>(
  'articles/deleteArticles',
  async (article: Article): Promise<void> =>
    articlesApi.deleteArticleById(article.id),
)

export const fetchOneArticleById = createAsyncThunk<Article, number>(
  'articles/fetchOneArticleById',
  async (articleId: number): Promise<Article> =>
    await articlesApi.getArticleById(articleId),
)
