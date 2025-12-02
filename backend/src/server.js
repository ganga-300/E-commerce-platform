const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const { pool } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('StudyStuff Backend is running');
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('close', () => {
    console.log('Server closed');
});

// Keep process alive just in case
setInterval(() => {
    console.log('Heartbeat');
}, 10000);
