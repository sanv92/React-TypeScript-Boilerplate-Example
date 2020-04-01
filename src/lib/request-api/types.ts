export interface RequestConfigMethods {
  get: RequestMethodProps
  post: RequestMethodProps
  put: RequestMethodProps
  patch: RequestMethodProps
  delete: RequestMethodProps
}

export interface ConfigOptions {
  baseUrl: string
  defaultOptions?: RequestOptions
}

type RequestMethodProps = <T>(
  url: string,
  options?: RequestOptions,
) => Promise<T>

export type Headers = { [key: string]: string }
export type Parameters = object
export type BodyRequest<T = object> = FormData | string | void | T
export interface RequestOptions {
  headers?: Headers
  params?: Parameters
  body?: BodyRequest
}
