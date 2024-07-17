const express = require('express')
const router = express.Router()

const {createAdmin, login,updateAdmin , deleteAdmin,getAdminById,getAdmin} = require('../controller/admin.controller');
const {createProduct,updateProduct,getProducts,getProductById,deleteProduct} = require('../controller/product.controller');
const {authentication , authorization} = require('../middleware/middleware')
const {createUser,getUser,updateUser,deleteUser} = require('../controller/user.control')


// const upload = multer({
//       storage: multer.memoryStorage(), // Use memoryStorage for buffer
//       limits: { fileSize: 1000000 }, // 1MB limit (optional)
//   });
  

//ADMIN
router.post('/admin/register', createAdmin);    
router.post('/admin/login', login);
router.get('/admin', getAdmin);
router.put('/admin/:id', authentication,authorization, updateAdmin); //middleware
router.delete('/admin/:id',authentication,authorization,  deleteAdmin); 

//USER
router.post('/user' ,authentication, createUser );   //middleware
router.get('/user' , getUser );
router.put('/user/:id' , authentication,authorization, updateUser );
router.delete('/user/:id' ,authentication,authorization, deleteUser );

//STORAGE
router.post('/storage',authentication,createProduct);    //middleware
router.get('/storage' , getProducts );
router.get('/storage/:id' , getProductById );
router.put('/storage/:id' , authentication, authorization,updateProduct );
router.delete('/storage/:id' ,authentication,authorization, deleteProduct );

//ALL
router.all('/*', (req , res) => {
  res.status(400).send({ status: false, message: " path invalid" });
});

module.exports = router;