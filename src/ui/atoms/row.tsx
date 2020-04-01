import React, { ReactElement, ReactNode } from 'react'
import { Row as BootstrapRow } from 'react-bootstrap'
import classNames from 'classnames/bind'

const styles = {
  mt1: 'mt-1',
  mt2: 'mt-2',
  mt3: 'mt-3',
  mt4: 'mt-4',
  mt5: 'mt-5',
  mb1: 'mb-1',
  mb2: 'mb-2',
  mb3: 'mb-3',
  mb4: 'mb-4',
  mb5: 'mb-5',
}

const cx = classNames.bind(styles)

interface RowProps {
  mt?: number
  mb?: number
  children: ReactNode
}

export const Row = ({
  mt,
  mb,
  children,
  ...properties
}: RowProps): ReactElement => (
  <BootstrapRow
    {...properties}
    className={cx({
      mt1: mt === 1,
      mt2: mt === 2,
      mt3: mt === 3,
      mt4: mt === 4,
      mt5: mt === 5,
      mb1: mb === 1,
      mb2: mb === 2,
      mb3: mb === 3,
      mb4: mb === 4,
      mb5: mb === 5,
    })}
  >
    {children}
  </BootstrapRow>
)
