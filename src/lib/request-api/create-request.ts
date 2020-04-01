import axios, { Method } from 'axios'

import { RequestConfigMethods, ConfigOptions, RequestOptions } from './types'
import { createOptions } from './create-options'

export const createRequest = ({
  baseUrl = '/api',
  defaultOptions,
}: ConfigOptions): RequestConfigMethods => ({
  get: <T>(url: string, options?: RequestOptions): Promise<T> => {
    return request(
      'GET',
      url,
      {
        headers: options?.headers,
        params: options?.params,
      },
      { baseUrl, defaultOptions },
    )
  },

  post: <T>(url: string, options?: RequestOptions): Promise<T> => {
    return request(
      'POST',
      url,
      {
        headers: options?.headers,
        params: options?.params,
        body: options?.body,
      },
      { baseUrl, defaultOptions },
    )
  },

  put: <T>(url: string, options?: RequestOptions): Promise<T> => {
    return request(
      'PUT',
      url,
      {
        headers: options?.headers,
        params: options?.params,
        body: options?.body,
      },
      { baseUrl, defaultOptions },
    )
  },

  patch: <T>(url: string, options?: RequestOptions): Promise<T> => {
    return request(
      'PATCH',
      url,
      {
        headers: options?.headers,
        params: options?.params,
        body: options?.body,
      },
      { baseUrl, defaultOptions },
    )
  },

  delete: <T>(url: string, options?: RequestOptions): Promise<T> => {
    return request(
      'DELETE',
      url,
      {
        headers: options?.headers,
        params: options?.params,
        body: {},
      },
      { baseUrl, defaultOptions },
    )
  },
})

const request = <T>(
  method: Method,
  url: string,
  options: RequestOptions = {
    headers: {},
    params: {},
    body: {},
  },
  config: ConfigOptions,
): Promise<T> => {
  return axios(createOptions(method, url, options, config)).then(
    (response) => response.data,
  )
}
