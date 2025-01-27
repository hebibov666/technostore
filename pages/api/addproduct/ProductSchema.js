const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true
  },
  discountPrice:{
type:Number,
required:false,
  },
  description:{
    type:String,
    required:true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  file: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
