require('dotenv').config();
const express = require('express');
const User = require('./UserSchema'); 
const router = express.Router();
const twilio = require('twilio');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);

router.post('/api/register', async (req, res) => {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
        return res.status(400).json({ message: 'Name, phone, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, phone, password: hashedPassword });

        await user.save();
        res.json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'User could not be saved', error: error.message });
    }
});

router.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: 'Require name and password' });
    }

    try {
       
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'User dont found' });
        }

      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name, 
                phone: user.phone,
            },
            process.env.JWT_SECRET,  
            { expiresIn: '1h' }  
        );

      
        res.json({
            message: 'Login success',
            token,  
            id: user._id,  
            name: user.name,  
            phone: user.phone,  
        });
    } catch (error) {
        res.status(500).json({ message: 'Error',error });
    }
});

module.exports = router;
