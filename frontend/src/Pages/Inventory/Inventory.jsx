import React, { useState, useEffect, useCallback } from "react";
import { RiHomeSmileFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import "react-notifications/lib/notifications.css";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import img from "../../shared/ImageGallery/logo.svg";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Navbar,
  Image,
  Button,
  Form,
  Modal,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "../../assests/Dashboard.css";
import ProductTable from "./ProductTable";

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");

  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [minimumStockLevel, setMinimumStockLevel] = useState("");
  const [warrantyCheck, setWarrantyCheck] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // const fetchProducts = useCallback(async () => {
  //   try {
  //     const response = await axios.get("https://inventory1-0bkk.onrender.com/storage", {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     });

  //     setProducts(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // }, [token]);
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://inventory1-0bkk.onrender.com/storage",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateProductsList = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://inventory1-0bkk.onrender.com/storage",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setProducts(response.data.data);
    } catch (error) {
      console.error("Error updating products list:", error);
    }
  }, [token]);

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("purchaseDate", purchaseDate);
      formData.append("warrantyCheck", warrantyCheck);
      formData.append("minimumStockLevel", minimumStockLevel);
      formData.append("adminId", localStorage.getItem("adminId"));

      const response = await axios.post(
        "http://localhost:8080/storage",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(response.data); // Handle success response here
      setShowModal(false);
      updateProductsList(); // Update the products list after adding a new product
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/dashboard"); // Navigate to the login page
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStockFilterChange = (e) => {
    setFilter(e.target.value); // Update the filter state based on selection
  };
  const filteredProducts = products.filter((product) => {
    if (filter === "inStock") {
      return product.quantity >= product.minimumStockLevel;
    } else if (filter === "lowStock") {
      return product.quantity < product.minimumStockLevel;
    } else {
      return (
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true; // 'all' filter
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory selection when category changes
    // Fetch products based on selected category and subcategory if needed
  };
  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    // Fetch products based on selected category and subcategory
  };
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar p-3">
        <div className="logo-image my-3">
          <Image src={img} alt="Logo" fluid className="logo-image" />
          {/* <p>tce .</p> */}
        </div>
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
        <Nav.Link onClick={handleLogout} className="text-danger mt-auto">
          <Button className="button-add-product2">
            <RiHomeSmileFill size={25} />
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
                  <Dropdown.Item href="/dashboard">View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    <MdLogout /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
          </Navbar>
        </header>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Inventory Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPurchaseDate">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formWarrantyCheck">
                <Form.Label>Warranty Time</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Warranty Timeline"
                  value={warrantyCheck}
                  onChange={(e) => setWarrantyCheck(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formMinimumStockLevel">
                <Form.Label>Minimum Stock Level</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter minimum stock level"
                  value={minimumStockLevel}
                  onChange={(e) => setMinimumStockLevel(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="cancel" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button className="save" onClick={handleAddProduct}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Container fluid className="flex-grow-1">
          <Row>
            {/* Cards for categories, total products, low stock, etc. */}
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: "purple" }}>
                    Categories
                  </Card.Title>
                  <Card.Text style={{ color: " #f77f5b " }}>
                    Total ({products.length} items)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: "purple" }}>
                    Total Products
                  </Card.Title>
                  <Card.Text style={{ color: " #f77f5b " }}>
                    Total ({products.length} items)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: "purple" }}>Low Stock</Card.Title>
                  <Card.Text style={{ color: " #f77f5b " }}>
                    Total (
                    {
                      products.filter(
                        (product) =>
                          product.quantity < product.minimumStockLevel
                      ).length
                    }{" "}
                    items)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: "purple" }}>
                    Component 4
                  </Card.Title>
                  <Card.Text style={{ color: " #f77f5b " }}>
                    Total (x items)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Search and filter controls */}
          <Row className="my-3">
            <Col xs={4}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Type here to search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <InputGroup.Text>
                  <CiSearch />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={4}>
              <Form.Control
                as="select"
                value={filter}
                onChange={handleStockFilterChange}
              >
                <option value="">Filter by stock level</option>
                <option value="inStock">In Stock</option>
                <option value="lowStock">Low Stock</option>
              </Form.Control>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <Button
                onClick={() => setShowModal(true)}
                className="button-add-product"
              >
                <BiSolidMessageSquareAdd size={20} /> Add
              </Button>
            </Col>
            {/* <Col xs={4}>
  <Form.Control as="select" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
    <option value="">Select Category</option>
    {categories.map((category) => (
      <option key={category.name} value={category.name}>{category.name}</option>
    ))}
  </Form.Control>
</Col>
<Col xs={4}>
  <Form.Control as="select" value={selectedSubcategory} onChange={(e) => handleSubcategoryChange(e.target.value)}>
    <option value="">Select Subcategory</option>
    {categories.find((cat) => cat.name === selectedCategory)?.subcategories.map((subcat) => (
      <option key={subcat} value={subcat}>{subcat}</option>
    ))}
  </Form.Control>
</Col> */}

          </Row>

          {/* Product table */}
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Inventory Details</Card.Title>
                  <div className="table">
                    <ProductTable
                      products={filteredProducts}
                      updateProductsList={updateProductsList}
                      token={token}
                    />
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

export default Inventory;
