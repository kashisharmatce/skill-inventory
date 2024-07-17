const adminDetails = require('../model/admin.model')
const jwt = require('jsonwebtoken')
const { isValidEmail , isValidRequestBody, isValidMobile } = require('../validations/valid');

require('dotenv').config();
const {  JWT_SECRET , JWT_EXPIRY} = process.env

const createAdmin = async function (req, res) {
    try {
        let admin= req.body
        const { name, email, password , mobile , designation} = admin;

        //checking for required fields
        if (!name) { return res.status(400).send({ status: false, message: "Name is required" }) }

        if (!email) { return res.status(400).send({ status: false, message: "Email is required" }) }

        if (!password) { return res.status(400).send({ status: false, message: "Password is required" }) }

        if (!mobile) { return res.status(400).send({ status: false, message: "Mobile Number is required" }) }
        
        // if (!isValidMobile(email)) { return res.status(400).send({ status: false, message: "Invalid Mobile Number" }) }
        // console.log(mobile);
        // if (!designation) { return res.status(400).send({ status: false, message: "designation is required" }) }

        if (password.length < 6) return res.status(400).send({ status: false, message: "Password length should be greater than 6 characters" })

        if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Invalid Email" }) }

        //checking for unique mail
        const uniqueMail = await adminDetails.findOne({ email: email });
        if (uniqueMail) return res.status(400).send({ status: false, message: "Email already exists" });
        
        let adminCreated = await adminDetails.create(admin)
        return res.status(201).send({ status: true, msg:"Admin Created Successfully", data: adminCreated })
    }
    
    catch (err) { return res.status(500).send({ status: false, message: err.message }) }

}
//==================CRUD METHODS================================
//================/GET METHOD/==================================

const getAdmin = async function (req, res) {
    try {
        const user = await adminDetails.find()
        res.status(200).send({ status: true, msg:"Admin Data", data: user });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: 'Internal Server Error' });
    }
};
// Retrieve a single product by ID
const getAdminById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await adminDetails.findById(userId);
        if (!user) return res.status(404).send({ status: false, message: "Admin not found" });
        return res.status(200).send({ status: true, data: user });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

//===============Login-User==========================

// const generateToken = (admin) => {
//     return jwt.sign({ admin_id: admin._id }, JWT_SECRET, JWT_Expiry);
// };

// const login = async (req, res) => {
//     try {
//         if (!isValidRequestBody(req.body)) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'Invalid Request Parameters, Please provide login details'
//             });
//         }

//         const { email, password } = req.body;

//         if (!isValidEmail(email)) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Invalid Email"
//             });
//         }

//         if (!email || !password) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Please enter both email and password"
//             });
//         }

//         const user = await adminDetails.findOne({ email, password });

//         if (!user) {
//             return res.status(401).json({
//                 status: false,
//                 message: 'You are not registered'
//             });
//         }

//         const token = jwt.sign({ user_id: user._id }, JWT_SECRET);

//         res.status(200).json({
//             status: true,
//             data: {
//                 token: `Bearer ${token}` // Include Bearer prefix
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: false,
//             message: error.message
//         });
//     }
// };

const login = async (req, res) => {
    try {
        if (!isValidRequestBody(req.body)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid Request Parameters, Please provide login details'
            });
        }

        const { email, password } = req.body;

        if (!isValidEmail(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Email"
            });
        }

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Please enter both email and password"
            });
        }

        const user = await adminDetails.findOne({ email, password });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'You are not registered'
            });
        }

        const token = jwt.sign({ user_id: user._id }, JWT_SECRET);
        console.log("Generated Token:", token); // Debug log

        res.status(200).json({
            status: true,
            data: {
                token: `Bearer ${token}` // Include Bearer prefix
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};


const updateAdmin = async (req, res) => {
    try {
      const adminId = req.params.id;
      const updateData = req.body;
    //   const ad = await adminDetails.findById({_id});
    //   if(!ad){
    //       return res
    //       .status(404)
    //       .send({ status: false, message: "Product not found in database" });
    //   }
      const updatedadmindetail = await adminDetails.findByIdAndUpdate(
        adminId,
        updateData,
        { new: true }
      );
      if (!updatedadmindetail)
        return res
          .status(404)
          .send({ status: false, message: "Admin not registered" });
      return res
        .status(200)
        .send({
          status: true,
          message: "Admin details updated successfully",
          data: updatedadmindetail,
        });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

  const deleteAdmin = async (req, res) => {
    try {
      const adminId = req.params.id;
      const deletead = await adminDetails.findByIdAndDelete(adminId);
      if (!deletead)
        return res
          .status(404)
          .send({ status: false, message: "Admin not found" });
      return res
        .status(200)
        .send({
          status: true,
          message: "Admin details deleted successfully",
          // data: deletedProduct,
        });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
  
module.exports = {getAdminById, createAdmin, login, getAdmin , updateAdmin , deleteAdmin};

