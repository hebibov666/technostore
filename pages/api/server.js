const express=require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app=express();
const PORT=3001;

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoURI = 'mongodb+srv://shiwakitv956:noreply666@cluster0.t6glx.mongodb.net/Classified?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB dont connected: ', err));

app.get("/api/home",(req,res)=>{
    res.json({message:"HELLO WORLD"})
})

const CreateUser=require("./createuser/UserModel")
const AddCategory=require("./category/CategoryModel")
const AddProduct=require("./addproduct/ProductModel")
const AddToCart=require("./addtocart/CartModel")
app.use("/",CreateUser)
app.use("/",AddCategory)
app.use("/",AddProduct)
app.use("/",AddToCart)


app.listen(PORT,()=>{
    console.log(`Server started ${PORT}`)
})