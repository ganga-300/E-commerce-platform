const express = require('express');
const { createOrder, getUserOrders, getOrderDetails } = require('../controllers/ordersController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getUserOrders);
router.get('/:id', authenticateToken, getOrderDetails);

module.exports = router;
