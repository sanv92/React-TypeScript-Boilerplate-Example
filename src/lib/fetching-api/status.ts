import { LoadingStatus, Fetching } from './types'

export const loadingStatus: LoadingStatus = {
  initial: 'initial',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
}

export const initialFetching: Fetching = {
  status: loadingStatus.initial,
  isLoading: true,
  isFailed: false,
  isFinished: false,
  error: null,
}

export const succeededFetching: Fetching = {
  status: loadingStatus.succeeded,
  isLoading: false,
  isFailed: false,
  isFinished: true,
  error: null,
}

export const pendingFetching: Fetching = {
  status: loadingStatus.pending,
  isLoading: true,
  isFailed: false,
  isFinished: false,
  error: null,
}

export const rejectedFetching: Fetching = {
  status: loadingStatus.initial,
  isLoading: false,
  isFailed: true,
  isFinished: true,
  error: null,
}
