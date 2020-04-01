import React, { ReactElement } from 'react'

import { UserFormPage } from './user-form'

export const UserCreatePage = (): ReactElement => (
  <UserFormPage name="No name" isLoading={false} />
)
