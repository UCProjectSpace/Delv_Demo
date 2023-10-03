import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'


export default function NavBar() {
  return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">Supply Chain Demo</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link style={{justifyContent: "right"}}>Home</Nav.Link> */}
            {/* <Nav.Link>Features</Nav.Link>
            <Nav.Link>Pricing</Nav.Link> */}
          </Nav>
          </Container>
        </Navbar>
      </>
  )
}
