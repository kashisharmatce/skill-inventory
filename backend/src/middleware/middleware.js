const jwt = require("jsonwebtoken");
const adminModel = require("../model/admin.model");
const product = require("../model/product.model");
const user = require("../model/usertrack.model");
require("dotenv").config();

const { JWT_SECRET } = process.env;

const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization header missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
        console.log("Received Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "Token not found",
            });
        }

        jwt.verify(token, JWT_SECRET, async (error, decoded) => {
            if (error) {
                if (error.name === "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Token has expired, please log in again",
                    });
                }
                return res.status(401).json({
                    message: "Invalid token, authentication failed",
                });
            }

            const adminId = decoded.user_id;
            const admin = await adminModel.findById(adminId);
            if (!admin) {
                return res.status(401).json({
                    message: "Unauthorized access",
                });
            }

            req.adminId = admin._id;
            req.admin = admin;

            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// const authorization = async (req, res, next) => {
//     try {
//         let token = req.headers["authorization"];
//         if (!token) {
//             return res.status(401).json({
//                 status: false,
//                 message: "Authorization header not found"
//             });
//         }

//         token = token.split(' ')[1]; // Extract token after "Bearer"

//         const decoded = jwt.verify(token, JWT_SECRET);
//         const decodedUser = decoded.user_id;

//         const productId = req.params.id;
//         const getProduct = await product.findById(productId);

//         if (!getProduct) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Something Went Wrong"
//             });
//         }

//         const admin = getProduct.adminId.toString();

//         if (decodedUser !== admin) {
//             return res.status(403).json({
//                 status: false,
//                 message: "You are not authorized to perform this action"
//             });
//         }

//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: false,
//             message: "Internal Server Error"
//         });
//     }
// };

// const authorization = async (req, res, next) => {
//     try {
//         let token = req.headers["authorization"];
//         console.log("Authorization Header:", token); // Log the authorization header

//         if (!token) {
//             return res.status(401).json({
//                 status: false,
//                 message: "Authorization header not found"
//             });
//         }

//         token = token.split(' ')[1]; // Extract token after "Bearer"
//         console.log("Extracted Token:", token); // Log the extracted token

//         const decoded = jwt.verify(token, JWT_SECRET);
//         const decodedUser = decoded.user_id;
//         console.log("Decoded User ID:", decodedUser); // Log the decoded user ID

//         const productId = req.params.id;
//         console.log("Product ID:", productId); // Log the product ID

//         const getProduct = await product.findById(productId);
//         console.log("Retrieved Product:", getProduct); // Log the retrieved product

//         if (!getProduct) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Product not found"
//             });
//         }

//         const admin = getProduct.adminId.toString();
//         console.log("Product Admin ID:", admin); // Log the admin ID from the product

//         if (decodedUser !== admin) {
//             return res.status(403).json({
//                 status: false,
//                 message: "You are not authorized to perform this action"
//             });
//         }

//         next();
//     } catch (error) {
//         console.error("Authorization Error:", error); // Log the error
//         res.status(500).json({
//             status: false,
//             message: "Internal Server Error"
//         });
//     }
// };

const authorization = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization header missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1]; 
        const decoded = jwt.verify(token, JWT_SECRET);
        const decodedUser = decoded.user_id;

        if (req.originalUrl.includes("/admin")) {
            const admin = await adminModel.findById(decodedUser);
            if (!admin) {
                return res.status(401).json({
                    status: false,
                    message: "Unauthorized access",
                });
            }
        } else if (req.originalUrl.includes("/storage")) {
            const productId = req.params.id;
            const product1 = await product.findById(productId);
            if (!product1) {
                return res.status(404).json({
                    status: false,
                    message: "Product not found",
                });
            }
            const adminId = product1.adminId.toString();
            if (decodedUser !== adminId) {
                return res.status(403).json({
                    status: false,
                    message: "You are not authorized to perform this action",
                });
            }
        } else if (req.originalUrl.includes("/user")) {
            const userId = req.params.id;
            // console.log("user",userId);
            const user1 = await user.findById(userId);
            // console.log("user1",user1);
            if (!user1) {
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                });
            }
            const adminId = user1.adminId && user1.adminId.toString(); // Check if user1.adminId exists before calling toString()
            console.log("adminId",adminId);

            if (decodedUser !== adminId) {
                return res.status(403).json({
                    status: false,
                    message: "You are not authorized to perform this action",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid route",
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { authentication, authorization };
