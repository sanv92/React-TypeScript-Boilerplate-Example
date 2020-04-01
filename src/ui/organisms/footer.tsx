import React, { ReactElement } from 'react'
import { Nav } from 'react-bootstrap'
import { getYear } from 'date-fns'

import { NavLink } from '@lib/react-router-dom'

export const Footer = (): ReactElement => (
  <>
    <Nav className="justify-content-center" activeKey="/home">
      <Nav.Item>
        <NavLink to="/">
          {(isActive: boolean): ReactElement => (
            <Nav.Link as="span" active={isActive}>
              Home
            </Nav.Link>
          )}
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/articles">
          {(isActive: boolean): ReactElement => (
            <Nav.Link as="span" active={isActive}>
              Articles
            </Nav.Link>
          )}
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/users">
          {(isActive: boolean): ReactElement => (
            <Nav.Link as="span" active={isActive}>
              Users
            </Nav.Link>
          )}
        </NavLink>
      </Nav.Item>
    </Nav>
    <p className="text-center mt-4 mb-4">
      Copyright © {getYear(new Date())} github.com/SanderV1992
    </p>
  </>
)
