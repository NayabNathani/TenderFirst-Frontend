import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
      <Row>
        <Col xs={12} className="text-center mb-4">
          <RiErrorWarningFill size={'5rem'}/>
        </Col>
        <Col xs={12} className="text-center mb-4">
          <h1>Page Not Found</h1>
        </Col>
        <Col xs={12} className="text-center">
          <Link to="/">
            <Button variant="primary" style={{ backgroundColor: '#ECC94B' }}>Go to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound;
