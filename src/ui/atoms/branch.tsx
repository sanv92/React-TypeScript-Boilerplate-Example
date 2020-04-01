import React, { ReactElement } from 'react'

interface BranchProps {
  if: boolean
  children: ReactElement[]
}

export const Branch: React.FC<BranchProps> = ({
  if: condition,
  children,
}: BranchProps): ReactElement => {
  const [thenBranch, elseBranch, ...extra] = React.Children.toArray(children)

  if (extra.length > 0) {
    throw new Error(
      'Branch receives two React Nodes. You passed more. Use <></> to wrap your elements',
    )
  }
  const result = condition ? thenBranch : elseBranch

  return <>{result}</> || <></>
}
