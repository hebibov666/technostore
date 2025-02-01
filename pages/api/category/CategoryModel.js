// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('./CategorySchema');
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
      folder: 'categories', // Cloudinary'de kayıtlı resimlerin saklanacağı klasör
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // İzin verilen dosya türleri
    },
  });
  
  const upload = multer({ storage });
// Yeni kategori oluştur
router.post('/categories',upload.single('file'), async (req, res) => {
  try {
    const { name, parent,slug } = req.body;
    const validParent = parent === 'null' || !parent ? null : parent;
    const newCategory = new Category({ 
        name, 
        parent:validParent,
        slug ,
        file:req.file ? req.file.path : null,
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tüm kategorileri al
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir kategori ve alt kategorilerini al
router.get('/categories:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    const subcategories = await Category.find({ parent: id });
    res.status(200).json({ category, subcategories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kategori sil
router.delete('/categories:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Kategori silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
