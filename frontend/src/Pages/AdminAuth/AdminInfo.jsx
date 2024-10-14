import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { RiHomeSmileFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import img from '../../shared/ImageGallery/logo.svg'
import { BiSolidUserAccount } from "react-icons/bi";
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  Nav,
  Navbar,
  Image,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../../assests/Dashboard.css";
import AdminTable from './AdminTable';

const AdminInfo = () => {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8080/admin", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate("/login"); // Navigate to the login page
  };
  const handleDashboard = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate("/dashboard"); // Navigate to the login page
  };
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar p-3">
      <div className="logo-image my-3">
          <Image src={img} alt="Logo" fluid className="logo-image"/>
          {/* <p>tce .</p> */}
        </div>
        <Navbar.Brand as={Link} to="/">
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/dashboard">
          <MdSpaceDashboard /> Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/inventory">
          <MdInventory /> Inventory
          </Nav.Link>
          <Nav.Link as={Link} to="/user-track">
          <BiSolidUserAccount /> Tracking
          </Nav.Link>
          <Nav.Link as={Link} to="/admin-info">
          <HiUsers /> User Authentication
          </Nav.Link>
        </Nav>
        </Navbar.Brand>
        <Nav.Link onClick={handleDashboard} className="text-danger mt-auto">
          <Button className="button-add-product2">
            {/* <BsArrowLeftCircleFill size={25} /> */}
            <RiHomeSmileFill  size={25} />
          </Button>
        </Nav.Link>
      </aside>

      {/* Main Content */}
      <div className="main-content">
      <header>
          <Navbar className="d-flex justify-content-end" bg="light" expand="lg">
            <Navbar.Brand href="#home">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <i
                    className="fas fa-caret-down fa-lg"
                    style={{ fontSize: "20px" }}
                  >
                    <CgProfile />
                  </i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}><MdLogout /> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
          </Navbar>
        </header>

        <Container fluid className="flex-grow-1">
          <Row className="mb-3">
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Categories</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Products</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Low Stock</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>Out of Stock</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Authority Head</Card.Title>
                  <div className="table">
                    <AdminTable adminData={adminData} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminInfo;
