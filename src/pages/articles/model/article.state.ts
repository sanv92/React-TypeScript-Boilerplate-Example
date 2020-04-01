import { initialFetching } from '@lib/fetching-api'

export const initialArticleState: any = {
  model: {},
  fetching: initialFetching,
}

export const initialUsersState: any = {
  ids: [],
  entities: {},
  fetching: initialFetching,
}
