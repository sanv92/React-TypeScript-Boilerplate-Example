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
import { range } from 'ramda'

import { Branch, Button } from '@sander/ui'

import {
  fetchOneUserById,
  createUser,
  updateUser,
  resetState,
  selectUserModel,
  User,
} from '../../model/user'

interface StateProps {
  user: User
  userId: number
  isNew: boolean
}

const useMapStateToProperties = (): StateProps => {
  const parameters = useParams() as { userId: string }
  const isNew = !parameters.userId

  return {
    user: useSelector(selectUserModel),
    userId: Number.parseInt(parameters.userId, 0),
    isNew,
  }
}

interface DispatchProps {
  saveUser(user: User, callback: () => void): void
}

const useMapDispatchToProperties = (): DispatchProps => {
  const dispatch = useDispatch()
  const { isNew } = useMapStateToProperties()

  return {
    saveUser: (user: User, callback: () => void): void => {
      if (isNew) {
        dispatch(createUser(user))
      } else {
        dispatch(updateUser(user))
      }

      callback()
    },
  }
}

interface HandlerProps {
  goToUsers(): void
}

const useHandlers = (): HandlerProps => {
  const { push } = useHistory()

  return {
    goToUsers: (): void => push('/users'),
  }
}

interface FormProps {
  form: FormikProps<User>
}

const useForm = (): FormProps => {
  const { user, isNew } = useMapStateToProperties()
  const { saveUser } = useMapDispatchToProperties()
  const { goToUsers } = useHandlers()

  const initialValues = { id: null, age: 1, author: '' }
  const form = useFormik({
    initialValues: { ...initialValues, ...user },
    enableReinitialize: true,
    onSubmit: (values): void => {
      saveUser(
        {
          id: values.id,
          author: values.author,
          age: values.age,
        },
        () => {
          if (isNew) {
            goToUsers()
          }
        },
      )
    },
  })

  return { form }
}

const useFetch = (): void => {
  const dispatch = useDispatch()
  const { userId, isNew } = useMapStateToProperties()

  useEffect(() => {
    if (!isNew) {
      dispatch(fetchOneUserById(userId))
    }
    return (): void => {
      dispatch(resetState())
    }
  }, [])
}

const useEnhance = (): FormProps => {
  const { form } = useForm()

  useFetch()

  return { form }
}

interface Props {
  isLoading: boolean
  name: string
}

export const UserFormPage: React.FC<Props> = ({
  isLoading,
  name,
}: Props): ReactElement => {
  const { form } = useEnhance()

  return (
    <Branch if={isLoading}>
      <>
        <Spinner animation="border" role="status">
          <span className="sr-only text-center">Loading...</span>
        </Spinner>
      </>
      <>
        <h1>{name}</h1>
        <Form onSubmit={form.handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="title">Name</FormLabel>
            <FormControl
              id="author"
              name="author"
              type="text"
              onChange={(properties: FormEvent): void => {
                form.handleChange(properties)
              }}
              value={form.values.author}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="age">Age</FormLabel>
            <Form.Control
              id="age"
              name="age"
              as="select"
              value={form.values.age}
              onChange={(properties: FormEvent): void => {
                form.handleChange(properties)
              }}
            >
              {range(1, 100).map(
                (age): ReactElement => (
                  <option key={age}>{age}</option>
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
