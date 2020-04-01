import React, { ReactElement } from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import { NavLink } from '@lib/react-router-dom'

export const Header = (): ReactElement => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="/">Sander</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink to="/" exact>
          {(isActive: boolean): ReactElement => (
            <Nav.Link as="span" active={isActive}>
              Home
            </Nav.Link>
          )}
        </NavLink>
        <NavLink to="/articles">
          {(isActive: boolean): ReactElement => (
            <Nav.Link as="span" active={isActive}>
              Articles
            </Nav.Link>
          )}
        </NavLink>
        <NavLink to="/users">
          {(isActive: boolean): ReactElement => (
            <Nav.Link as="span" active={isActive}>
              Users
            </Nav.Link>
          )}
        </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
