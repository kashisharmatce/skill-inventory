import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FaUserEdit } from "react-icons/fa";
import { PiList } from "react-icons/pi";
import { TiArrowUnsorted } from "react-icons/ti";
import '../../assests/Dashboard.css'
import axios from "axios";

const AdminTable = ({ adminData }) => {
  const [show, setShow] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    designation: "",
  });

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(`http://localhost:8080/admin/${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        window.location.reload();
      }
    } catch (error) {
      window.location.reload(); // Reload the page after deleting the admin
      console.error("Error deleting admin:", error);
    }
  };

  const handleEdit = (admin) => {
    setCurrentAdmin(admin);
    setShow(true);
  };

  const handleClose = () => {
    setCurrentAdmin({
      name: "",
      email: "",
      mobile: "",
      password: "",
      designation: "",
    });
    setShow(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      if (!token) {
        console.error("No token found");
        return;
      }
      // console.log("id", currentAdmin._id);
      const response = await axios.put(
        `https://inventory1-0bkk.onrender.com/admin/${currentAdmin._id}`,
        {
          name: currentAdmin.name,
          email: currentAdmin.email,
          password: currentAdmin.password,
          mobile: currentAdmin.mobile,
          designation: currentAdmin.designation,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data) {
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
      console.error("Error updating admin:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAdmin({ ...currentAdmin, [name]: value });
  };

  return (
    <>
      <Table striped bordered hover className="admin-table">
        <thead>
          <tr>
            <th><PiList size={20}/></th>
            <th>Name <TiArrowUnsorted /></th>
            <th>Email <TiArrowUnsorted /></th>
            <th>Mobile <TiArrowUnsorted /></th>
            <th>Password <TiArrowUnsorted /></th>
            <th>Designation <TiArrowUnsorted /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminData.map((admin, index) => (
            <tr key={admin._id}>
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.mobile}</td>
              <td>{admin.password}</td>
              <td>{admin.designation}</td>
              <td>
                <Button
                  className="button-add-product"
                  onClick={() => handleEdit(admin)}
                >
                  {/* <FontAwesomeIcon icon={faPen} size="lg" /> */}
                  <FaUserEdit size={25}/>
                </Button>
                <Button
                  // variant="danger"
                  className="button-add-product1"
                  onClick={() => handleDelete(admin._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} size="lg" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentAdmin.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentAdmin.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formMobile" className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={currentAdmin.mobile}
                onChange={handleChange}
                placeholder="Enter mobile"
              />
            </Form.Group>

            {/* Password field */}
            {/* <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={currentAdmin.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </Form.Group> */}

            <Form.Group controlId="formDesignation" className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={currentAdmin.designation}
                onChange={handleChange}
                placeholder="Enter designation"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminTable;
