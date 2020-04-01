import React, { FormEvent, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  Spinner,
  ButtonGroup,
  FormLabel,
  FormControl,
  Form,
  FormGroup,
} from 'react-bootstrap'
import { FormikProps, useFormik } from 'formik'

import { Branch, Button } from '@sander/ui'

import {
  fetchOneArticleById,
  fetchUsers,
  createArticle,
  updateArticle,
  resetState,
  selectArticleModel,
  selectAllUsers,
  Article,
  User,
} from '../../model/article'

interface StateProps {
  article: Article
  articleId: number
  users: User[]
  isNew: boolean
}

const useMapStateToProperties = (): StateProps => {
  const parameters = useParams() as { articleId: string }
  const isNew = !parameters.articleId

  return {
    article: useSelector(selectArticleModel),
    articleId: Number.parseInt(parameters.articleId, 0),
    users: useSelector(selectAllUsers),
    isNew,
  }
}

interface DispatchProps {
  saveArticle(article: Article, callback: () => void): void
}

const useMapDispatchToProperties = (): DispatchProps => {
  const dispatch = useDispatch()
  const { isNew } = useMapStateToProperties()

  return {
    saveArticle: (article: Article, callback: () => void): void => {
      if (isNew) {
        dispatch(createArticle(article))
      } else {
        dispatch(updateArticle(article))
      }

      callback()
    },
  }
}

interface HandlerProps {
  goToArticles(): void
}

const useHandlers = (): HandlerProps => {
  const { push } = useHistory()

  return {
    goToArticles: (): void => push('/articles'),
  }
}

interface FormProps {
  form: FormikProps<Article>
}

const useForm = (): FormProps => {
  const { article, isNew } = useMapStateToProperties()
  const { saveArticle } = useMapDispatchToProperties()
  const { goToArticles } = useHandlers()

  const initialValues = { title: '' }
  const form = useFormik({
    initialValues: { ...initialValues, ...article },
    enableReinitialize: true,
    onSubmit: (values): void => {
      saveArticle(
        {
          id: values.id,
          title: values.title,
          userId: values.userId,
        },
        () => {
          if (isNew) {
            goToArticles()
          }
        },
      )
    },
  })

  return { form }
}

const useFetch = (): void => {
  const dispatch = useDispatch()
  const { articleId, isNew } = useMapStateToProperties()

  useEffect(() => {
    if (!isNew) {
      dispatch(fetchOneArticleById(articleId))
    } else {
      dispatch(fetchUsers())
    }

    return (): void => {
      dispatch(resetState())
    }
  }, [])
}

const useEnhance = (): StateProps & FormProps => {
  const { form } = useForm()
  const { article, articleId, users, isNew } = useMapStateToProperties()

  useFetch()

  return { form, article, articleId, users, isNew }
}

interface Props {
  isLoading: boolean
  title: string
}

export const ArticleFormPage: React.FC<Props> = ({
  isLoading,
  title,
}: Props): ReactElement => {
  const { form, users } = useEnhance()

  return (
    <Branch if={isLoading}>
      <>
        <Spinner animation="border" role="status">
          <span className="sr-only text-center">Loading...</span>
        </Spinner>
      </>
      <>
        <h1>{title}</h1>
        <Form onSubmit={form.handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormControl
              id="title"
              name="title"
              type="text"
              onChange={(properties: FormEvent): void => {
                form.handleChange(properties)
              }}
              value={form.values.title}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="userId">Users</FormLabel>
            <Form.Control
              id="userId"
              name="userId"
              as="select"
              value={form.values.userId}
              onChange={(properties: FormEvent): void => {
                form.handleChange(properties)
              }}
            >
              <option disabled>Select user ...</option>
              {users.map(
                (user): ReactElement => (
                  <option key={user.id} value={user.id}>
                    {user.author}
                  </option>
                ),
              )}
            </Form.Control>
          </FormGroup>
          <ButtonGroup>
            <Button variant="success" type="submit">
              Save
            </Button>
          </ButtonGroup>
        </Form>
      </>
    </Branch>
  )
}
