const express = require('express')
const router = express.Router()
const {
  loginCustomer,
  getMe,
} = require('../controllers/customerAuthController')
const { protect } = require('../middleware/authMiddleware')

router.get('/me', protect, getMe)
router.post('/login', loginCustomer)

module.exports = router
