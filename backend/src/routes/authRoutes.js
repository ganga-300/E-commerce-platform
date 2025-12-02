const express = require('express');
const { register, login, getMe, updateAddress } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticateToken, getMe);
router.put('/address', authenticateToken, updateAddress);

module.exports = router;
