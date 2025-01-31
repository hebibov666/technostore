const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    password: { 
        type: String, 
        required: true, 

    },
});

module.exports = mongoose.model('User', userSchema);

