const express = require('express');
const app = express();
const route = require('./src/route/route')
const multer = require('multer')
const cors = require('cors');
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
  }));

 app.use(express.json());
// app.use(multer().any())
app.use(express.urlencoded({ extended: true }))

const upload = multer({
    storage: multer.diskStorage({ destination: 'uploads/' }), // Adjust storage as needed
    limits: { fileSize: 1000000 },
    acl: 'public-read', // 1MB limit (optional)
  });
  app.use(upload.single('image'));

const mongoose = require('mongoose')
require('dotenv').config();

const {PORT , MONGODB_CONNECT} = process.env;

mongoose.set('strictQuery' , true);

mongoose.connect(
    MONGODB_CONNECT ,
    // { useNewUrlParser : true }
)
.then(()=>{
    console.log("Database Connected with MongoDb")
})
.catch((error)=>{
    console.log("Error in connection", error.message)
})

app.use('/',route);

app.listen(PORT , ()=>{
    console.log(`Server running at ${PORT}`)
})
