import { initialFetching } from '@lib/fetching-api'

export const initialUserState: any = {
  model: {},
  fetching: initialFetching,
}

export const initialArticlesState: any = {
  ids: [],
  entities: {},
}
