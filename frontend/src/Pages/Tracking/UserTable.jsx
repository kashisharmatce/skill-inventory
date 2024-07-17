// import React, { useState } from "react";
// import { Table, Button, Modal, Form } from "react-bootstrap";
// import axios from "axios";
// import { MdOutlineAddReaction } from "react-icons/md";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import { PiList } from "react-icons/pi";
// import { FaEye } from "react-icons/fa";
// import { TiArrowUnsorted } from "react-icons/ti";

// const UserTable = ({ userData = [], fetchUsers }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState({});
//   const [editedData, setEditedData] = useState({});
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [viewUser, setViewUser] = useState(null);

//   const token = localStorage.getItem("token");

//   const handleDelete = async (id) => {
//     try {
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const response = await axios.delete(`http://localhost:8080/user/${id}`, {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.data.status === true) {
//         fetchUsers(userData.filter((user) => user._id !== id));
//       } else {
//         console.error("Failed to delete user:", response.data.message);
//       }
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setEditedData({
//       name: user.name,
//       email: user.email,
//       mobile: user.mobile,
//       USN: user.USN,
//       component: {
//         productName: user.component.productName,
//         quantity: user.component.quantity,
//         issueAt: user.component.issueAt,
//         returnDate: user.component.returnDate,
//       },
//       status: user.status,
//     });
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setShowViewModal(false);
//   };

//   const handleView = (user) => {
//     setViewUser(user);
//     setShowViewModal(true);
//   };

//   const handleSaveChanges = async () => {
//     try {
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const response = await axios.put(
//         `http://localhost:8080/user/${selectedUser._id}`,
//         editedData,
//         {
//           headers: {
//             Authorization: `${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.status === true) {
//         fetchUsers(
//           userData.map((user) =>
//             user._id === selectedUser._id ? editedData : user
//           )
//         );
//       } else {
//         console.error("Failed to update user:", response.data.message);
//       }

//       setShowModal(false);
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const getStatusClassName = (status) => {
//     switch (status) {
//       case "active":
//         return "status-active";
//       case "inactive":
//         return "status-inactive";
//       case "pending":
//         return "status-pending";
//       case "returned":
//         return "status-returned";
//       default:
//         return "";
//     }
//   };

//   return (
//     <>
//       <Table striped bordered hover className="admin-table">
//         <thead>
//           <tr>
//             <th>
//               <PiList size={20} />
//             </th>
//             <th>Name <TiArrowUnsorted /></th>
//             <th>Email <TiArrowUnsorted /></th>
//             <th>Mobile <TiArrowUnsorted /></th>
//             <th>USN <TiArrowUnsorted /></th>
//             <th>Component Name <TiArrowUnsorted /></th>
//             <th>Quantity <TiArrowUnsorted /></th>
//             <th>Issued At <TiArrowUnsorted /></th>
//             <th>Status <TiArrowUnsorted /></th>
//             <th>Actions </th>
//           </tr>
//         </thead>
//         <tbody>
//           {userData.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.mobile}</td>
//               <td>{user.USN}</td>
//               <td>{user.component?.productName}</td>
//               <td>{user.component?.quantity}</td>
//               <td>{new Date(user.component?.issueAt).toLocaleDateString()}</td>
//               <td className={getStatusClassName(user.status)}>{user.status}</td>
//               <td>
//                 <Button
//                   className="button-add-product1"
//                   onClick={() => handleView(user)}
//                 >
//                   <FaEye size={20} />
//                 </Button>
//                 <Button
//                   className="button-add-product"
//                   onClick={() => handleEdit(user)}
//                 >
//                   <MdOutlineAddReaction size={20} />
//                 </Button>
//                 <Button
//                   className="button-add-product1"
//                   onClick={() => handleDelete(user._id)}
//                 >
//                   <FontAwesomeIcon icon={faTrashAlt} size="lg" />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={editedData.name || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={editedData.email || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formMobile">
//               <Form.Label>Mobile</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="mobile"
//                 value={editedData.mobile || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formUSN">
//               <Form.Label>USN</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="USN"
//                 value={editedData.USN || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formproductName">
//               <Form.Label>Component Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="productName"
//                 value={editedData.component?.productName || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formQuantity">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="quantity"
//                 value={editedData.component?.quantity || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formStatus">
//               <Form.Label>Status</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="status"
//                 value={editedData.status || ""}
//                 onChange={handleChange}
//               >
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="pending">Pending</option>
//                 <option value="returned">Returned</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="cancel" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button className="save" onClick={handleSaveChanges}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showViewModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {viewUser && (
//             <div>
//               <p><strong>Name:</strong> {viewUser.name}</p>
//               <p><strong>Email:</strong> {viewUser.email}</p>
//               <p><strong>Mobile:</strong> {viewUser.mobile}</p>
//               <p><strong>USN:</strong> {viewUser.USN}</p>
//               <p><strong>Component Name:</strong> {viewUser.component?.productName}</p>
//               <p><strong>Quantity:</strong> {viewUser.component?.quantity}</p>
//               <p><strong>Issued Date:</strong> {new Date(viewUser.component?.issueAt).toLocaleDateString()}</p>
//               <p><strong>Return Date:</strong> {new Date(viewUser.component?.returnDate).toLocaleDateString()}</p>
//               <p><strong>Status:</strong> {viewUser.status}</p>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="cancel" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default UserTable;
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { MdOutlineAddReaction } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { PiList } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";

const UserTable = ({ userData = [], fetchUsers }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [editedData, setEditedData] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [components, setComponents] = useState([{ productName: '', quantity: '', issueAt: '', returnDate: '' }]);


  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(`http://localhost:8080/user/${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === true) {
        fetchUsers(userData.filter((user) => user._id !== id));
      } else {
        console.error("Failed to delete user:", response.data.message);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      USN: user.USN,
      // component: {
      //   productName: user.component?.productName,
      //   quantity: user.component?.quantity,
      //   issueAt: user.component?.issueAt,
      //   returnDate: user.component?.returnDate,
      // },
      // components: user.components.map((comp) => ({
      //   productName: comp.productName,
      //   quantity: comp.quantity,
      //   issueAt: comp.issueAt,
      //   returnDate: comp.returnDate,
      // })),
      components: user.components || [],
      status: user.status,
    });
    console.log(user.component?.productName);
    setComponents(user.components || [{ productName: '', quantity: '', issueAt: '', returnDate: '' }]);
    setShowModal(true);
    // setShowModal(true);
  };
 

  const handleClose = () => {
    setShowModal(false);
    setShowViewModal(false);
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/user/${selectedUser._id}`,
        editedData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === true) {
        fetchUsers(
          userData.map((user) =>
            user._id === selectedUser._id ? editedData : user
          )
        );
      } else {
        console.error("Failed to update user:", response.data.message);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "pending":
        return "status-pending";
      case "returned":
        return "status-returned";
      default:
        return "";
    }
  };

  // useEffect(()=>{
  //   console.log("434:",userData?.map((i)=>i.components[0].productName))
  //   console.log("434:",userData?.map((i)=>i.components[0].quantity))
  //   console.log("434:",userData?.map((i)=>i.components[0].issueAt))
  //   console.log("434:",userData?.map((i)=>i.components[0].returnDate))
  // },[userData])

  // this is how you access the data from components loopp over like  this for other itms just channge the nanne to quantity etc

  return (
    <>
      <Table striped bordered hover className="admin-table">
        <thead>
          <tr>
            <th>
              <PiList size={20} />
            </th>
            <th>Name <TiArrowUnsorted /></th>
            <th>Email <TiArrowUnsorted /></th>
            <th>Mobile <TiArrowUnsorted /></th>
            <th>USN <TiArrowUnsorted /></th>
            <th>Component Name <TiArrowUnsorted /></th>
            <th>Quantity <TiArrowUnsorted /></th>
            <th>Issued At <TiArrowUnsorted /></th>
            <th>Status <TiArrowUnsorted /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.USN}</td>
              <td>{user.components.map((comp, idx) => (
                <div key={idx}>{comp.productName || "N/A"}</div>
              ))}</td>
              <td>{user.components.map((comp, idx) => (
                <div key={idx}>{comp.quantity || "N/A"}</div>
              ))}</td>
              <td>{user.components.map((comp, idx) => (
                <div key={idx}>{comp.issueAt ? new Date(comp.issueAt).toLocaleDateString() : "N/A"}</div>
              ))}</td>
              <td className={getStatusClassName(user.status)}>{user.status}</td>
              <td>
                <Button
                  className="button-add-product1"
                  onClick={() => handleView(user)}
                >
                  <FaEye size={20} />
                </Button>
                <Button
                  className="button-add-product"
                  onClick={() => handleEdit(user)}
                >
                  <MdOutlineAddReaction size={20} />
                </Button>
                <Button
                  className="button-add-product1"
                  onClick={() => handleDelete(user._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedData.name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedData.email || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={editedData.mobile || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formUSN">
              <Form.Label>USN</Form.Label>
              <Form.Control
                type="text"
                name="USN"
                value={editedData.USN || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formproductName">
              <Form.Label>Component Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={editedData.component?.productName || ""}
                onChange={(e) =>
                  setEditedData((prevData) => ({
                    ...prevData,
                    component: {
                      ...prevData.component,
                      productName: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={editedData.component?.quantity || ""}
                onChange={(e) =>
                  setEditedData((prevData) => ({
                    ...prevData,
                    component: {
                      ...prevData.component,
                      quantity: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formIssueAt">
              <Form.Label>Issued At</Form.Label>
              <Form.Control
                type="date"
                name="issueAt"
                value={editedData.component?.issueAt || ""}
                onChange={(e) =>
                  setEditedData((prevData) => ({
                    ...prevData,
                    component: {
                      ...prevData.component,
                      issueAt: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formReturnDate">
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="date"
                name="returnDate"
                value={editedData.component?.returnDate || ""}
                onChange={(e) =>
                  setEditedData((prevData) => ({
                    ...prevData,
                    component: {
                      ...prevData.component,
                      returnDate: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            {editedData.components?.map((comp, idx) => (
              <div key={idx}>
                <Form.Group controlId={`formproductName-${idx}`}>
                  <Form.Label>Component Name</Form.Label>
                  <Form.Control
                    type="text"
                    name={`productName-${idx}`}
                    value={comp.productName || ""}
                    onChange={(e) =>
                      setEditedData((prevData) => {
                        const updatedComponents = [...prevData.components];
                        updatedComponents[idx].productName = e.target.value;
                        return { ...prevData, components: updatedComponents };
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId={`formQuantity-${idx}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name={`quantity-${idx}`}
                    value={comp.quantity || ""}
                    onChange={(e) =>
                      setEditedData((prevData) => {
                        const updatedComponents = [...prevData.components];
                        updatedComponents[idx].quantity = e.target.value;
                        return { ...prevData, components: updatedComponents };
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId={`formIssueAt-${idx}`}>
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    name={`issueAt-${idx}`}
                    value={comp.issueAt || ""}
                    onChange={(e) =>
                      setEditedData((prevData) => {
                        const updatedComponents = [...prevData.components];
                        updatedComponents[idx].issueAt = e.target.value;
                        return { ...prevData, components: updatedComponents };
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId={`formReturnDate-${idx}`}>
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    type="date"
                    name={`returnDate-${idx}`}
                    value={comp.returnDate || ""}
                    onChange={(e) =>
                      setEditedData((prevData) => {
                        const updatedComponents = [...prevData.components];
                        updatedComponents[idx].returnDate = e.target.value;
                        return { ...prevData, components: updatedComponents };
                      })
                    }
                  />
                </Form.Group>
              </div>
            ))}
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={editedData.status || ""}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="returned">Returned</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="save" onClick={handleSaveChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showViewModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewUser && (
            <div>
              <p><strong>Name:</strong> {viewUser.name}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Mobile:</strong> {viewUser.mobile}</p>
              <p><strong>USN:</strong> {viewUser.USN}</p>
              {viewUser.components?.map((comp, idx) => (
                <div key={idx}>
                  <p><strong>Component Name:</strong> {comp.productName || "N/A"}</p>
                  <p><strong>Quantity:</strong> {comp.quantity || "N/A"}</p>
                  <p><strong>Issued Date:</strong> {comp.issueAt ? new Date(comp.issueAt).toLocaleDateString() : "N/A"}</p>
                  <p><strong>Return Date:</strong> {comp.returnDate ? new Date(comp.returnDate).toLocaleDateString() : "N/A"}</p>
                </div>
              ))}
              <p><strong>Status:</strong> {viewUser.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;
