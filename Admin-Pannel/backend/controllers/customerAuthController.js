const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')


// @desc    Authenticate a customer
// @route   POST /api/customer/login
// @access  Public
const loginCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    if(!email || !password){
        res.status(400).json({ message: 'All credentials are required' })
    }

    // Check for user email
    const customer = await Customer.findOne({ email })

    // if(customer.active)
    // {
        if (customer && (await bcrypt.compare(password, customer.password)))
        {
            res.json({
                _id: customer.id,
                firstname: customer.firstname,
                lastname: customer.lastname,
                name: customer.name,
                email: customer.email,
                token: generateToken(customer._id),
            })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
            throw new Error('Invalid credentials')
        }
    // } else {
    //     res.status(401).json({ message: 'User is not active. Please contact you system administrator' })
    //     throw new Error('Invalid credentials')
    // }
    })
    

  
// @desc    Get customer data
// @route   GET /api/customer/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.customer)
})
  
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d', })
}
  
module.exports = {
    loginCustomer,
    getMe,
}
  