// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assests/SignUp.css'

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     mobile: '',
//     designation: ''
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('https://inventory1-0bkk.onrender.com/admin/register', formData);
//       setMessage('Admin registered successfully');
//       setError('');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (error) {
//       setMessage('');
//       setError(error.response?.data?.message || 'Error registering admin');
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-md-center">
//         <Col xs={12} md={6}>
//           <Card>
//             <Card.Body>
//               <Card.Title>Register</Card.Title>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formName" className="mb-3">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter name"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail" className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter email"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formPassword" className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter password"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formMobile" className="mb-3">
//                   <Form.Label>Mobile</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     placeholder="Enter mobile number"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formDesignation" className="mb-3">
//                   <Form.Label>Designation</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     placeholder="Enter designation"
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">Register</Button>
//               </Form>
//               <div className="mt-3">
//                 Already registered? <a href="/login">Login</a>
//               </div>
//               {message && <Alert variant="success" className="mt-3">{message}</Alert>}
//               {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Nav, Tab, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBriefcase } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assests/SignUp.css';
import '../assests/Dashboard.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    designation: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/admin/register', formData);
      setMessage('Admin registered successfully');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('');
      setError(error.response?.data?.message || 'Error registering admin');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.data.token;
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setLoginError('Login failed: ' + response.statusText);
      }
    } catch (error) {
      setLoginError('Error logging in: ' + error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Tab.Container defaultActiveKey="register">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="register">Register</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="register">
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleRegisterSubmit}>
                      <Form.Group controlId="formName">
                        <Form.Label><FaUser /> Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                      </Form.Group>
                      <Form.Group controlId="formEmail" className="mt-3">
                        <Form.Label><FaEnvelope /> Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                      <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label><FaLock /> Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                        />
                      </Form.Group>
                      <Form.Group controlId="formMobile" className="mt-3">
                        <Form.Label><FaPhone /> Mobile</Form.Label>
                        <Form.Control
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="Enter your mobile number"
                        />
                      </Form.Group>
                      <Form.Group controlId="formDesignation" className="mt-3">
                        <Form.Label><FaBriefcase /> Designation</Form.Label>
                        <Form.Control
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          placeholder="Enter your designation"
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="mt-4">
                        Register
                      </Button>
                    </Form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="login">
                    {loginError && <Alert variant="danger">{loginError}</Alert>}
                    <Form onSubmit={handleLoginSubmit}>
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label><FaEnvelope /> Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          placeholder="Enter email"
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label><FaLock /> Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          placeholder="Enter password"
                          required
                        />
                      </Form.Group>

                      <Button  type="submit">Login</Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Register;

