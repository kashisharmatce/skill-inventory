import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiList } from "react-icons/pi";
import { LuClipboardEdit } from "react-icons/lu";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaEye } from "react-icons/fa";
import '../../assests/Dashboard.css'

import axios from "axios";

const ProductTable = ({ products, updateProductsList }) => {
  const [show, setShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(
        `https://inventory1-0bkk.onrender.com/storage/${id}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status === true) {
        updateProductsList(products.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete product:", response.data.message);
      }
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false); 
    setShowViewModal(false);
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.put(
        `https://inventory1-0bkk.onrender.com/storage/${currentProduct._id}`,
        currentProduct,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status === true) {
        updateProductsList(
          products.map((prod) =>
            prod._id === currentProduct._id ? currentProduct : prod
          )
        );
      } else {
        console.error("Failed to update product:", response.data.message);
      }
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const getStatus = (product) => {
    return product.quantity < product.minimumStockLevel ? "Low-Stock" : "In-Stock";
  };

  const handleView = (product) => {
    setViewProduct(product);
    setShowViewModal(true);
  };
  return (
    <>
      <Table striped bordered hover className="admin-table">
        <thead>
          <tr>
            <th><PiList size={20}/></th>
            <th>Name <TiArrowUnsorted /></th>
            <th>Category <TiArrowUnsorted /></th>
            <th>Description <TiArrowUnsorted /></th>
            <th>Purchase Date <TiArrowUnsorted /></th>
            <th>Stock <TiArrowUnsorted /></th>
            <th>Price <TiArrowUnsorted /></th>
            {/* <th>Minimum Stock</th> */}
            <th>Status <TiArrowUnsorted /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{new Date(product.purchaseDate).toLocaleDateString()}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              {/* <td>{product.minimumStockLevel}</td> */}
              <td style={{ color: product.quantity < product.minimumStockLevel ? 'red' : 'green' , fontWeight:'bold' }}>
                {getStatus(product)}
              </td>
              <td>
              <Button
                  className="button-add-product1"
                  onClick={() => handleView(product)}
                >
                  <FaEye size={25}/>
                </Button>
                <Button
                  className="button-add-product3"
                  onClick={() => handleEdit(product)}
                >
                  <LuClipboardEdit size={25}/>
                </Button>
                <Button
                  className="button-add-product1"
                  onClick={() => handleDelete(product._id)}
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
          <Modal.Title>Update Inventory Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={currentProduct?.productName }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={currentProduct?.category }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentProduct?.description }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={currentProduct?.quantity }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct?.price }
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control
                type="date"
                name="purchaseDate"
                value={currentProduct?.purchaseDate?.split("T")[0] }
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Minimum Stock</Form.Label>
              <Form.Control
                type="number"
                name="minimumStockLevel"
                value={currentProduct?.minimumStockLevel || ''}
                onChange={handleChange}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="save" onClick={handleSave}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewProduct && (
            <div>
              <p><strong>Product Name:</strong> {viewProduct.productName}</p>
              <p><strong>Category:</strong> {viewProduct.category}</p>
              <p><strong>Description:</strong> {viewProduct.description}</p>
              <p><strong>Price:</strong> {viewProduct.price}</p>
              <p><strong>Purchase Date:</strong> {new Date(viewProduct.purchaseDate).toLocaleDateString()}</p>
              <p><strong>Quantity:</strong> {viewProduct.quantity}</p>
              <p><strong>Minimum Stock Level:</strong> {viewProduct.minimumStockLevel}</p>
              <p><strong>Warranty Period:</strong> {viewProduct.warrantyCheck}</p>
              <p><strong>Status:</strong> {getStatus(viewProduct)}</p>
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

export default ProductTable;
