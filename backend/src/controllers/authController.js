const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password.' });
    }

    try {
        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, university, created_at',
            [name, email, passwordHash]
        );

        const user = newUser.rows[0];

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        console.log(`User registered: ${user.email}`);
        res.status(201).json({ user, token });
    } catch (err) {
        console.error('Error in register:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    try {
        // Check user
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        const user = result.rows[0];

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Remove password hash from response
        delete user.password_hash;

        console.log(`User logged in: ${user.email}`);
        res.json({ user, token });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

const getMe = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, university, phone, college_block, room_number, address_notes, created_at FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error in getMe:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

const updateAddress = async (req, res) => {
    const { phone, collegeBlock, roomNumber, notes } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'UPDATE users SET phone = $1, college_block = $2, room_number = $3, address_notes = $4 WHERE id = $5 RETURNING id, name, email, university, phone, college_block, room_number, address_notes, created_at',
            [phone, collegeBlock, roomNumber, notes, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        console.log(`Address updated for user: ${userId}`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating address:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};

module.exports = { register, login, getMe, updateAddress };
