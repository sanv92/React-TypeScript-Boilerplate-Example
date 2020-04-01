import React, { ReactElement } from 'react'

import { ArticleFormPage } from './article-form'

export const ArticleCreatePage = (): ReactElement => (
  <ArticleFormPage title="Create New Article" isLoading={false} />
)
