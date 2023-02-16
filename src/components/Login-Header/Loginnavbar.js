import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import './navbar.css';
import Headerlogo from "./assests/logo.png"

function navbar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          {/* <a href="#" className="logoimg"><img src={Headerlogo} alt="" class="img-fluid logoimg"/></a> */}
          <Navbar.Brand className="logo me-auto">
            <a href="/">
              <h4>Tender First</h4>
              <span>.</span>
            </a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className="me-5 ms-5" href="/" cpas>
                Home
              </Nav.Link>
              <Nav.Link className="ms-5 me-5" eventKey={2} href="/#about">
                About
              </Nav.Link>
              <Nav.Link className="ms-5" eventKey={3} href="/#team">
                Our Team
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default navbar
