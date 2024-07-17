const userModel = require("../model/usertrack.model");
const { isValidEmail, isValidMobile } = require("../validations/valid");

const createUser = async function (req, res) {
  try {
    const { name, email, mobile, USN, components, status } = req.body;
    let { productName, quantity, issueAt, returnDate } = components;
    console.log("req.body", req.body);

    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "user name is required" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, message: "Invalid Email" });
    }

    if (!mobile) {
      return res
        .status(400)
        .send({ status: false, message: "mobile is required" });
    }
    if (!isValidMobile(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid mobile" });
    }

    if (!USN) {
      return res
        .status(400)
        .send({ status: false, message: "USN is required" });
    }

    // if (!components) { return res.status(400).send({ status: false, message: "component details is required" }) }
    // if (!components || !Array.isArray(components) || components.length === 0) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Component details are required" });
    // }
if (!components || components.length === 0) {
  return res
    .status(400)
    .send({ status: false, message: "Component details are required and cannot be empty" });
}

    // for (const component of components) {
    //   if (!component.productName || !component.quantity) {
    //     return res.status(400).send({ status: false, message: "Please enter component name and quantity" });
    //   }
    // }

    // if (!quantity) { return res.status(400).send({ status: false, message: "Please provide quantity" }) }

    if (!["inactive", "active", "pending", "returned"].includes(status)) {
      return res.status(400).send({
        status: false,
        message:
          "Status must be one of 'inactive', 'active', 'pending', 'returned'",
      });
    }

    //checking for unique mail
    const uniqueMail = await userModel.findOne({ email: email });
    if (uniqueMail)
      return res
        .status(400)
        .send({ status: false, message: "this email already exist" });

    //checking for unique mail
    const uniqueUSN = await userModel.findOne({ USN: USN });
    if (uniqueUSN)
      return res
        .status(400)
        .send({ status: false, message: "this USN already exist" });

    const newUser = await userModel.create({
      name,
      email,
      mobile,
      USN,
      components,
      status,
      adminId: req.admin._id, // Assuming adminId is available in req
    });
    return res
      .status(201)
      .send({ status: true, msg: "User Created Successfully", data: newUser });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
//==================CRUD METHODS================================
//================/GET METHOD/==================================

const getUser = async function (req, res) {
  try {
    const user = await userModel.find();
    res.status(200).send({ status: true, msg: "User Data", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: "Internal Server Error" });
  }
};
// Retrieve a single product by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user)
      return res.status(404).send({ status: false, message: "User not found" });
    return res.status(200).send({ status: true, data: user });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Update
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedDetail = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );
    if (!updatedDetail)
      return res
        .status(404)
        .send({ status: false, message: "User not registered" });
    return res.status(200).send({
      status: true,
      message: "User details updated successfully",
      data: updatedDetail,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("req", req);
    const deleteU = await userModel.findByIdAndDelete(userId);
    if (!deleteU)
      return res.status(404).send({ status: false, message: "User not found" });
    return res.status(200).send({
      status: true,
      message: "User details deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { getUserById, createUser, getUser, updateUser, deleteUser };
