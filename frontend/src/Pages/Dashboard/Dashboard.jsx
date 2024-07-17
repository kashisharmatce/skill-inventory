import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiUsers } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import img from '../../shared/ImageGallery/logo.svg'
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  Nav,
  Navbar,
  Image
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../../assests/Dashboard.css"; 
import BarChart from "../../shared/barChart/BarChart";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar p-3">
      {/* <div className="sidebar-sticky"> */}
        <div className="logo-image my-3">
          <Image src={img} alt="Logo" fluid className="logo-image"/>
          {/* <p>tce .</p> */}
        </div>
      {/* </div> */}

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
        {/* <div className="mt-auto"> */}
          {" "}
          {/* This div will push the logout button to the bottom */}
          {/* <Nav.Link onClick={handleLogout} className="text-danger">
            Logout
          </Nav.Link> */}
        {/* </div> */}
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
                  <Card.Title style={{ color: 'purple' }}>Most issued item</Card.Title>
                  {/* <Card.Text>Total (4 items)</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: 'purple' }}>Top users</Card.Title>
                  {/* <Card.Text>Total (4)</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: 'purple' }}>Total Products</Card.Title>
                  {/* <Card.Text>Total (40 items)</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: 'purple' }}>Component 4</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Graph</Card.Title>
                  <div >
                    <BarChart />
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

export default Dashboard;
