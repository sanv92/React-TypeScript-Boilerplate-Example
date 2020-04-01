import React, { HTMLAttributes, ReactElement, ReactText } from 'react'
import {
  Button as BootstrapButton,
  ButtonProps as BootstrapButtonProperties,
} from 'react-bootstrap'

type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

interface ButtonProperties
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactText
}

export const Button: React.FC<ButtonProperties & BootstrapButtonProperties> = ({
  children,
  ...properties
}: ButtonProperties & BootstrapButtonProperties): ReactElement => (
  <BootstrapButton {...properties}>{children}</BootstrapButton>
)
