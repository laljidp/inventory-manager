import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>IManager</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/home">
            Home
          </Link>
          <Link className="nav-link" to="/products">
            Products
          </Link>
          <Link className="nav-link" to="/inventory">
            Inventory
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
