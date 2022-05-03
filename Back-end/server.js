const express = require('express')
const mongoose = require("mongoose");
const Admin = require("./model/admin");
const Product = require("./model/product");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const {createTokens, validateToken} = require("./JWT");

const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.post("/login", async(req, res) => {
  const {email, password} = req.body;

  const user = await Admin.findOne({email: email});

  if(!user) res.send("User doesnot exist");

  if(user) {
  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if(!match){
      res.send("Wrong Password")
    }else{
      const accessToken = createTokens(user);
      res.json({token: accessToken});
      // res.send("Logged In");
    }
  });
  }
});

app.post("/register", async(req, res) => {
  try{
    console.log("req.body: ",req.body);

    const {email, password, name} = req.body;

    await bcrypt.hash(password, 10).then((hash) => {
       Admin.create({
        email: email,
        password: hash,
        name: name,
      }).then(()=>{
        res.send("Admin Added");
      }).catch((err) => {
        console.log(err);
      });
    });
  } catch (err) {}
});

app.post("/user", validateToken, async(req, res) => {
  const {email} = req.body;
  const user = await Admin.findOne({email: email});
  if(user){
  const loginname = user.name; 
  res.send(loginname); }
});

app.get("/product", async(req, res) => {
  const products = await Product.find();
  if(products){
  res.send(products); }
});

app.post("/productregister", async(req, res) => {
  try{
    console.log("req.body: ",req.body);

    const {product_name, product_image, product_price, product_rating, product_reviews} = req.body;

    await Product.create({
        product_name: product_name,
        product_image: product_image,
        product_price: product_price,
        product_rating: product_rating,
        product_reviews: product_reviews,
      }).then(()=>{
        res.send("Product Added");
      }).catch((err) => {
        console.log(err);
      });
  } catch (err) {}
});

app.listen(5000);

