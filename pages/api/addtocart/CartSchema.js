const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true, min: 1 },
        name: { type: String },
        price: { type: Number },
        file: { type: String },
      },
    ],
  });
  module.exports = mongoose.model('Cart', CartSchema);