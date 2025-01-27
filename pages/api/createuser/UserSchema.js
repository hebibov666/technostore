const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: true, 

    },
});

const otpSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
});

const User = mongoose.model('User',userSchema);
const OTP = mongoose.model('OTP', otpSchema);
module.exports = { User, OTP };
