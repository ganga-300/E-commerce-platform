const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
    try {
        const sqlPath = path.join(__dirname, '../db/init.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running database initialization...');
        await pool.query(sql);
        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await pool.end();
    }
};

initDb();
