import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { ButtonGroup, Spinner, Table } from 'react-bootstrap'

import { Branch, Button, Row, Col } from '@sander/ui'

import {
  fetchOneUserById,
  deleteArticle,
  resetState,
  selectFetchingIsLoading,
  selectUserModel,
  selectAllArticles,
  User,
  Article,
} from '../../model/user'

interface StateProps {
  isLoading: boolean
  user: User
  userId: number
  articles: Article[]
}

const useMapStateToProperties = (): StateProps => {
  const parameters = useParams() as { userId: string }

  return {
    isLoading: useSelector(selectFetchingIsLoading),
    user: useSelector(selectUserModel),
    articles: useSelector(selectAllArticles),
    userId: Number.parseInt(parameters.userId, 0),
  }
}

interface HandlerProps {
  goToUserEdit(): void
  goToArticle(article: Article): void
  deleteArticleItem(article: Article): void
}

const useHandlers = (): HandlerProps => {
  const dispatch = useDispatch()
  const { push, location } = useHistory()

  return {
    goToUserEdit: (): void => push(`${location.pathname}/edit`),
    goToArticle: (article: Article): void =>
      push(`/articles/${article.id}`),
    deleteArticleItem: (article: Article): void => {
      dispatch(deleteArticle(article))
    },
  }
}

const useFetch = (): void => {
  const dispatch = useDispatch()
  const { userId } = useMapStateToProperties()

  useEffect(() => {
    dispatch(fetchOneUserById(userId))
    return (): void => {
      dispatch(resetState())
    }
  }, [])
}

const useEnhance = (): Props => {
  const { goToUserEdit, goToArticle, deleteArticleItem } = useHandlers()
  const { isLoading, user, userId, articles } = useMapStateToProperties()

  useFetch()

  return {
    isLoading,
    user,
    userId,
    articles,
    goToUserEdit,
    goToArticle,
    deleteArticleItem,
  }
}

type Props = StateProps & HandlerProps

export const UserShowPage: React.FC<Props> = (): ReactElement => {
  const {
    user,
    isLoading,
    articles,
    goToUserEdit,
    goToArticle,
    deleteArticleItem,
  } = useEnhance()

  return (
    <Branch if={isLoading}>
      <>
        <Spinner animation="border" role="status">
          <span className="sr-only text-center">Loading...</span>
        </Spinner>
      </>
      <>
        <Row mb={2}>
          <Col>
            <h1>{user.author}</h1>
            <Button
              variant="primary"
              onClick={(): void => {
                goToUserEdit()
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>
        <Row mb={2}>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>age</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.author}</td>
                  <td>{user.age}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row mb={2}>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: '100%' }}>Title</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td style={{ width: '100%' }}>{article.title}</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          variant="primary"
                          onClick={(): void => {
                            goToArticle(article)
                          }}
                        >
                          Show
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(): void => {
                            deleteArticleItem(article)
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
