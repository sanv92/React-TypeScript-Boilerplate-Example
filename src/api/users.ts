import { requestMockApi } from './request'

export interface User {
  id: number
  author: string
  age: number
}

const getUsers = (): Promise<User[]> => requestMockApi.get('/users')

const getUserById = (userId: number): Promise<User> =>
  requestMockApi.get(`/users/${userId}`)

const getUserByName = (name: string): Promise<User> =>
  requestMockApi.get('/users', {
    params: {
      author: name,
    },
  })

const saveUser = (user: User): Promise<User> =>
  requestMockApi.post('/users', { body: user })

const updateUser = (userId: number, user: User): Promise<User> =>
  requestMockApi.put(`/users/${userId}`, { body: user })

const deleteUserById = (userId: number): Promise<void> => {
  return requestMockApi.delete(`/users/${userId}`)
}

export const usersApi = {
  getUserById,
  getUserByName,
  getUsers,
  saveUser,
  updateUser,
  deleteUserById,
}
