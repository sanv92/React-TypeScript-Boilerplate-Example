export type LoadingType = 'initial' | 'pending' | 'succeeded' | 'failed'
export interface LoadingStatus {
  initial: LoadingType
  pending: LoadingType
  succeeded: LoadingType
  failed: LoadingType
}

export type Error = Array<string> | string | null
export interface Fetching {
  status: LoadingType
  isLoading: boolean
  isFailed: boolean
  isFinished: boolean
  error: Error
}
