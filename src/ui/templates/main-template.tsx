import React, { ReactElement, ReactNode } from 'react'
import { Container } from 'react-bootstrap'

import { Row, Col } from '@sander/ui'

type MainTemplateProps = {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export const MainTemplate = ({
  header,
  footer,
  children,
}: MainTemplateProps): ReactElement => (
  <>
    {header && <>{header}</>}
    <Container fluid="md">
      <Row mt={5} mb={5}>
        <Col>{children}</Col>
      </Row>
    </Container>
    {footer && (
      <>
        <Container fluid>
          <Row>
            <Col>{footer}</Col>
          </Row>
        </Container>
      </>
    )}
  </>
)
