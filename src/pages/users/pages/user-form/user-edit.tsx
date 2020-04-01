import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import {
  User,
  selectFetchingIsLoading,
  selectUserModel,
} from '../../model/user'

import { UserFormPage } from './user-form'

export const UserEditPage = (): ReactElement => {
  const user: User = useSelector(selectUserModel)
  const isLoading: boolean = useSelector(selectFetchingIsLoading)

  return <UserFormPage name={user?.author} isLoading={isLoading} />
}
