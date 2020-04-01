import { AxiosRequestConfig, Method } from 'axios'

import { ConfigOptions, RequestOptions, Headers } from './types'

const CONTENT_TYPE = 'Content-Type'

export const createOptions = (
  method: Method,
  url: string,
  options: RequestOptions,
  config: ConfigOptions,
): AxiosRequestConfig => ({
  method,
  withCredentials: true,
  headers: createHeaders({ ...options, ...config.defaultOptions }),
  params: { ...options.params, ...config.defaultOptions?.params },
  data: options.body,
  baseURL: config.baseUrl,
  url,
})

const createHeaders = (options: RequestOptions): Headers => {
  return {
    ...options.headers,
    [CONTENT_TYPE]:
      options.headers && options.headers[CONTENT_TYPE]
        ? options.headers[CONTENT_TYPE]
        : 'application/json;charset=UTF-8',
  }
}
