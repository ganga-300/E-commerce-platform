const { pool } = require('../config/db');

const createOrder = async (req, res) => {
    const { items, totalAmount, paymentMethod, deliveryDetails } = req.body;
    const userId = req.user.id;

    if (!items || !totalAmount || !paymentMethod) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Start transaction
        await pool.query('BEGIN');

        // Update user address if provided
        if (deliveryDetails) {
            await pool.query(
                'UPDATE users SET phone = $1, college_block = $2, room_number = $3, address_notes = $4 WHERE id = $5',
                [deliveryDetails.phone, deliveryDetails.collegeBlock, deliveryDetails.roomNumber, deliveryDetails.notes, userId]
            );
        }

        // Create order
        const orderResult = await pool.query(
            'INSERT INTO orders (user_id, total_amount, payment_method, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, totalAmount, paymentMethod, 'confirmed']
        );
        const order = orderResult.rows[0];

        // Insert order items
        for (const item of items) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_name, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
                [order.id, item.name, item.quantity, item.price]
            );
        }

        // Create initial tracking entry
        await pool.query(
            'INSERT INTO tracking (order_id, stage) VALUES ($1, $2)',
            [order.id, 'confirmed']
        );

        await pool.query('COMMIT');

        console.log(`Order created: ${order.id} for user: ${userId}`);
        res.status(201).json({ order });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            `SELECT o.id, o.user_id, o.total_amount, o.payment_method, o.status, 
                    o.created_at AT TIME ZONE 'UTC' as created_at,
                    COUNT(oi.id) as items_count,
                    json_agg(json_build_object('name', oi.product_name, 'quantity', oi.quantity, 'price', oi.price_at_purchase)) as items
             FROM orders o
             LEFT JOIN order_items oi ON o.id = oi.order_id
             WHERE o.user_id = $1
             GROUP BY o.id
             ORDER BY o.created_at DESC`,
            [userId]
        );

        res.json({ orders: result.rows });
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getOrderDetails = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        // Get order with items
        const orderResult = await pool.query(
            `SELECT o.id, o.user_id, o.total_amount, o.payment_method, o.status, 
                    o.created_at AT TIME ZONE 'UTC' as created_at,
                    json_agg(json_build_object('name', oi.product_name, 'quantity', oi.quantity, 'price', oi.price_at_purchase)) as items
             FROM orders o
             LEFT JOIN order_items oi ON o.id = oi.order_id
             WHERE o.id = $1 AND o.user_id = $2
             GROUP BY o.id`,
            [id, userId]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const order = orderResult.rows[0];

        // Get tracking history
        const trackingResult = await pool.query(
            'SELECT * FROM tracking WHERE order_id = $1 ORDER BY timestamp ASC',
            [id]
        );

        order.tracking = trackingResult.rows;

        res.json({ order });
    } catch (err) {
        console.error('Error fetching order details:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createOrder, getUserOrders, getOrderDetails };
