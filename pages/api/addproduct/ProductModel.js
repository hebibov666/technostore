const express = require('express');
const router = express.Router();
const Product = require('./ProductSchema');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'products', 
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], 
    },
  });
  
  const upload = multer({ storage });
router.post('/addproduct',upload.single('file'), async (req, res) => {
  try {
    const { name,price,discountPrice,description,category } = req.body;
    const newCategory = new Product({ 
        name, 
       price,
       discountPrice:discountPrice ? discountPrice : null,
       description,
       category,
        file:req.file ? req.file.path : null,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/products', async (req, res) => {
  try {
      const { categoryName } = req.query; 

      let products;
      if (categoryName) {
          products = await Product.find({category: categoryName });
      } else {
        products = await Product.find();
      }

      res.status(200).json(products);
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: error.message });
  }
});

  router.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' }); 
      }
  
      res.status(200).json(product); 
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  });
  
module.exports = router;
