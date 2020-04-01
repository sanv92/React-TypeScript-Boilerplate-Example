import React, { ReactElement } from 'react'
import { Route, Link, NavLinkProps } from 'react-router-dom'

export const NavLinkComponent = ({
  to,
  children,
  className,
  activeClassName,
  exact,
  ...rest
}: NavLinkProps): ReactElement => {
  const path = typeof to === 'object' ? to.pathname : to

  return (
    <>
      <Route
        exact={exact}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        path={path}
        // eslint-disable-next-line react/no-children-prop
        children={({ match }): ReactElement => {
          const isActive = !!match

          return (
            <Link
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
              className={
                isActive
                  ? [className, activeClassName].filter((i) => i).join(' ')
                  : className
              }
              to={to}
            >
              {typeof children === 'function' ? children(isActive) : children}
            </Link>
          )
        }}
      />
    </>
  )
}
