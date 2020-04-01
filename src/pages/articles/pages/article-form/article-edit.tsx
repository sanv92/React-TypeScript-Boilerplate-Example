import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import {
  Article,
  selectFetchingIsLoading,
  selectArticleModel,
} from '../../model/article'

import { ArticleFormPage } from './article-form'

export const ArticleEditPage = (): ReactElement => {
  const article: Article = useSelector(selectArticleModel)
  const isLoading: boolean = useSelector(selectFetchingIsLoading)

  return (
    <ArticleFormPage
      title={`${article?.title} (${article.id})`}
      isLoading={isLoading}
    />
  )
}
