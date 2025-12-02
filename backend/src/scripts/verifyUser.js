const { pool } = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

const verifyUser = async () => {
    const email = process.argv[2];
    if (!email) {
        console.error('Please provide an email address.');
        process.exit(1);
    }

    try {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (res.rows.length > 0) {
            console.log(`User found: ${res.rows[0].email}`);
            console.log(`ID: ${res.rows[0].id}`);
            console.log(`Created At: ${res.rows[0].created_at}`);
        } else {
            console.log('User not found.');
        }
    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        await pool.end();
    }
};

verifyUser();
