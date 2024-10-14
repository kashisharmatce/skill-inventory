import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';

const MyInfo = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data.data);  // Update to access 'data' property correctly
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {userData ? (
            <Card>
              <Card.Body>
                <Card.Title>User Profile</Card.Title>
                <Card.Text><strong>Name:</strong> {userData.name}</Card.Text>
                <Card.Text><strong>Email:</strong> {userData.email}</Card.Text>
                <Card.Text><strong>Mobile:</strong> {userData.mobile}</Card.Text>
                <Card.Text><strong>Designation:</strong> {userData.designation}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyInfo;
