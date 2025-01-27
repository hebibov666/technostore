require('dotenv').config();
const express = require('express');
const { User, OTP } = require('./UserSchema'); 
const router = express.Router();
const twilio = require('twilio');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);

router.post('/api/send-otp', async (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ message: 'Name and phone required' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); 

    try {
        await OTP.create({ phone, otp });
        await client.messages.create({
            body: `Your otp code: ${otp}`,
            from: '+16086056378',
            to: phone,
        });

        res.json({ message: 'OTP send!' });
    } catch (error) {
        res.status(500).json({ message: 'OTP dont send' });
    }
});

router.post('/api/verify-otp', async (req, res) => {
    const { name, phone, otp, password } = req.body;

    if (!name || !phone || !otp || !password) {
        return res.status(400).json({ message: 'Require name,password and otp' });
    }

    try {
        const existingOTP = await OTP.findOne({ phone, otp });
        if (!existingOTP) {
            return res.status(400).json({ message: 'Wrong OTP' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = new User({ name, phone, password: hashedPassword });

        await user.save();

       
        await OTP.deleteMany({ phone });

        res.json({ message: 'User added' });
    } catch (error) {
        res.status(500).json({ message: 'User dont saved', error: error.message });
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
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;
