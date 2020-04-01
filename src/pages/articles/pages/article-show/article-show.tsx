import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner, ButtonGroup } from 'react-bootstrap'

import { Branch, Button } from '@sander/ui'

import {
  fetchOneArticleById,
  resetState,
  selectFetchingIsLoading,
  selectArticleModel,
  Article,
} from '../../model/article'

interface StateProps {
  isLoading: boolean
  article: Article
  articleId: number
}

const useMapStateToProperties = (): StateProps => {
  const parameters = useParams() as { articleId: string }

  return {
    isLoading: useSelector(selectFetchingIsLoading),
    article: useSelector(selectArticleModel),
    articleId: Number.parseInt(parameters.articleId, 0),
  }
}

interface HandlerProps {
  goToArticleEdit(): void
}

const useHandlers = (): HandlerProps => {
  const { push, location } = useHistory()

  return {
    goToArticleEdit: (): void => push(`${location.pathname}/edit`),
  }
}

const useFetch = (): void => {
  const dispatch = useDispatch()
  const { articleId } = useMapStateToProperties()

  useEffect(() => {
    dispatch(fetchOneArticleById(articleId))
    return (): void => {
      dispatch(resetState())
    }
  }, [])
}

type Props = StateProps & HandlerProps

const useEnhance = (): Props => {
  const { isLoading, articleId, article } = useMapStateToProperties()
  const { goToArticleEdit } = useHandlers()

  useFetch()

  return { isLoading, articleId, article, goToArticleEdit }
}

export const ArticleShowPage = (): ReactElement => {
  const { isLoading, article, goToArticleEdit } = useEnhance()

  return (
    <Branch if={isLoading}>
      <>
        <Spinner animation="border" role="status">
          <span className="sr-only text-center">Loading...</span>
        </Spinner>
      </>
      <>
        <h1>
          {article.title} ({article.id})
        </h1>
        <ButtonGroup>
          <Button onClick={(): void => goToArticleEdit()}>Edit</Button>
        </ButtonGroup>
      </>
    </Branch>
  )
}
