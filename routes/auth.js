const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import User model
const router = express.Router();
const authenticate = require('../middleware/auth'); // Import authentication middleware


router.post('/signup', async(req, res)=>{
    console.log('request body', req.body);
    try{
        const {name, email, password, confirm_password} = req.body;
        
        //input validation
        if(!name || !email || !password || !confirm_password){
            return res.status(400).json({error: 'All fields are required'});
        }

        if(password !== confirm_password) {
            return res.status(400).json({error: 'Passwords do not match'});
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({error: 'User already exists'})
        }
        
        //create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save();
        //generate JWT token
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(201).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({error: 'Invalid email or password'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({error: 'Invalid email or password'})
        }
        const token = jwt.sign({
            userID: user._id
        }, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/profile', authenticate, async(req, res)=>{
    try{
        console.log('req.user.userID', req.user.userID);
        if(!req.user.userID){
            return res.status(401).json({error: 'Unauthorized access'})
        }
        const user = await User.findById(req.user.userID).select('name email')
        if(!user){
            return res.status(404).json({error: 'User not found'})
        }

        res.status(200).json({
            message: 'Profile retrived successfully',
            user: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).json({message: 'server error'})
    }
})

module.exports = router;