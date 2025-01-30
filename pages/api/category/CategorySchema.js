// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null, // null -> Ana kategori
  },
  slug:{
    type:String,
  },
  file: { type: String },
});

module.exports = mongoose.model('Category', categorySchema);
