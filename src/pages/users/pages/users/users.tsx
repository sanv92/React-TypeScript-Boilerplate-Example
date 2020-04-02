import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Table, Spinner, ButtonGroup } from 'react-bootstrap'

import { Branch, Button, Row, Col } from '@sander/ui'

import {
  fetchUsers,
  deleteUser,
  resetState,
  selectTotalUsers,
  selectAllUsers,
  selectFetchingIsLoading,
  User,
} from '../../model/users'

interface StateProps {
  count: number
  users: User[]
  isLoading: boolean
}

const useMapStateToProperties = (): StateProps => ({
  count: useSelector(selectTotalUsers),
  users: useSelector(selectAllUsers),
  isLoading: useSelector(selectFetchingIsLoading),
})

const useFetch = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    return (): void => {
      dispatch(resetState())
    }
  }, [])
}

interface HandlerProps {
  goToUser(user: User): void
  goToUserNew(): void
  deleteUserItem(user: User): void
}

const useHandlers = (): HandlerProps => {
  const dispatch = useDispatch()
  const { push, location } = useHistory()

  return {
    goToUser: (user: User): void => push(`${location.pathname}/${user.id}`),
    goToUserNew: (): void => push(`${location.pathname}/new`),
    deleteUserItem: (user: User): void => {
      dispatch(deleteUser(user))
    },
  }
}

type Props = StateProps & HandlerProps

const useEnhance = (): Props => {
  const { count, isLoading, users } = useMapStateToProperties()
  const { goToUser, goToUserNew, deleteUserItem } = useHandlers()

  useFetch()

  return {
    count,
    users,
    isLoading,
    goToUser,
    goToUserNew,
    deleteUserItem,
  }
}

export const UsersPage = (): ReactElement => {
  const {
    count,
    users,
    isLoading,
    goToUser,
    goToUserNew,
    deleteUserItem,
  } = useEnhance()

  return (
    <Branch if={isLoading}>
      <>
        <Spinner animation="border" role="status">
          <span className="sr-only text-center">Loading...</span>
        </Spinner>
      </>
      <>
        <Row>
          <Col>
            <h1>Users ({count})</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={(): void => {
                goToUserNew()
              }}
            >
              Create New User
            </Button>
          </Col>
        </Row>
        <Row mt={5}>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ width: '50%' }}>Author</th>
                  <th style={{ width: '50%' }}>Age</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td style={{ width: '50%' }}>{user.author}</td>
                    <td style={{ width: '50%' }}>{user.age}</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          variant="primary"
                          onClick={(): void => {
                            goToUser(user)
                          }}
                        >
                          Show
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(): void => {
                            deleteUserItem(user)
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    </Branch>
  )
}
