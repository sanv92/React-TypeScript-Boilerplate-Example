import { requestMockApi } from './request'

export interface Article {
  id: number
  title: string
  userId: number
}

const getArticles = (): Promise<Article[]> => {
  return requestMockApi.get('/articles')
}

const getArticleById = (articleId: number): Promise<Article> =>
  requestMockApi.get(`/articles/${articleId}`)

const getArticleByTitle = (title: string): Promise<Article> =>
  requestMockApi.get('/articles', {
    params: {
      title,
    },
  })

interface ArticleFilter {
  id?: number
  title?: string
  userId?: number
}

const getArticlesFilter = ({
  id,
  title,
  userId,
}: ArticleFilter): Promise<Article[]> =>
  requestMockApi.get('/articles', {
    params: {
      id,
      title,
      userId,
    },
  })

const saveArticle = (user: Article): Promise<Article> =>
  requestMockApi.post('/articles', { body: user })

const updateArticle = (articleId: number, user: Article): Promise<Article> =>
  requestMockApi.put(`/articles/${articleId}`, { body: user })

const deleteArticleById = (articleId: number): Promise<void> => {
  return requestMockApi.delete(`/articles/${articleId}`)
}

export const articlesApi = {
  getArticles,
  getArticleById,
  getArticleByTitle,
  getArticlesFilter,
  saveArticle,
  updateArticle,
  deleteArticleById,
}
