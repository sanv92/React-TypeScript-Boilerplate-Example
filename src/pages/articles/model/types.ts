import { Fetching } from '@lib/fetching-api'

export interface ArticlesState {
  ids: Array<number>
  entities: Record<number, Article>
  fetching: Fetching
}

export interface ArticleState {
  model: Article
  fetching: Fetching
}

export interface Article {
  id: number
  title: string
  userId: number
}

export interface UsersState {
  ids: Array<number>
  entities: Record<number, User>
  fetching: Fetching
}

export interface User {
  id: number
  author: string
  age: number
}
