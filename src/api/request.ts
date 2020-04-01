import { createRequest } from '@lib/request-api'

export const requestApi = createRequest({ baseUrl: '/api' })
export const requestMockApi = createRequest({ baseUrl: '/mock/api' })
