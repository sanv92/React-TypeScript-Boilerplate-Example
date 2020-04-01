import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Table, Spinner, ButtonGroup } from 'react-bootstrap'

import { Branch, Button, Row, Col } from '@sander/ui'

import {
  fetchArticles,
  deleteArticle,
  resetState,
  selectTotalArticles,
  selectAllArticles,
  selectFetchingIsLoading,
  Article,
} from '../../model/articles'

interface StateProps {
  count: number
  articles: Article[]
  isLoading: boolean
}

const useMapStateToProperties = (): StateProps => ({
  count: useSelector(selectTotalArticles),
  articles: useSelector(selectAllArticles),
  isLoading: useSelector(selectFetchingIsLoading),
})

const useFetch = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles())
    return (): void => {
      dispatch(resetState())
    }
  }, [])
}

interface HandlerProps {
  goToArticle(article: Article): void
  goToArticleNew(): void
  deleteArticleItem(article: Article): void
}

const useHandlers = (): HandlerProps => {
  const dispatch = useDispatch()
  const { push, location } = useHistory()

  return {
    goToArticle: (article: Article): void =>
      push(`${location.pathname}/${article.id}`),
    goToArticleNew: (): void => push(`${location.pathname}/new`),
    deleteArticleItem: (article: Article): void => {
      dispatch(deleteArticle(article))
    },
  }
}

type Props = StateProps & HandlerProps

const useEnhance = (): Props => {
  const { count, isLoading, articles } = useMapStateToProperties()
  const { goToArticle, goToArticleNew, deleteArticleItem } = useHandlers()

  useFetch()

  return {
    count,
    articles,
    isLoading,
    goToArticle,
    goToArticleNew,
    deleteArticleItem,
  }
}

export const ArticlesPage = (): ReactElement => {
  const {
    count,
    articles,
    isLoading,
    goToArticle,
    goToArticleNew,
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
        <Row>
          <Col>
            <h1>Articles ({count})</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={(): void => {
                goToArticleNew()
              }}
            >
              Create New Article
            </Button>
          </Col>
        </Row>
        <Row mt={5}>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ width: '100%' }}>Title</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.id}</td>
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
