import React, { ReactElement, ReactNode } from 'react'
import { Col as BootstrapCol } from 'react-bootstrap'

interface ColProps {
  children: ReactNode
}

export const Col = ({ children, ...properties }: ColProps): ReactElement => (
  <BootstrapCol {...properties}>{children}</BootstrapCol>
)
