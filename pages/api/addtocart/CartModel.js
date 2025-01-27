const express = require('express');
const router = express.Router();
const Cart=require("./CartSchema")
const Product=require("../addproduct/ProductSchema")
router.post('/addtocart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'Wrong details' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   
    let cart = await Cart.findOne({ userId });

    if (!cart) {
     
      cart = new Cart({
        userId,
        products: [
          {
            productId,
            quantity,
            name: product.name,
            price: product.price,
            file: product.file, 
          },
        ],
      });
    } else {
  
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
     
        existingProduct.quantity += quantity;
      } else {
      
        cart.products.push({
          productId,
          quantity,
          name: product.name,
          price: product.price,
          file: product.file,
        });
      }
    }
    await cart.save();
    res.status(200).json({ message: 'Product add to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User id not found' });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ message: 'Error' });
    }

    res.status(200).json({ message: 'Success', cart });
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ message: 'Network error' });
  }
});

router.delete('/removefromcart', async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'Wrong details.' });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Basket not found' });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    cart.products.splice(productIndex, 1);
    if (cart.products.length === 0) {
      await Cart.deleteOne({ userId });
    } else {
      await cart.save();
    }

    res.status(200).json({ message: 'Product deleted', cart });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Network error' });
  }
});

  module.exports = router;