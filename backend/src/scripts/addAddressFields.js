const { pool } = require('../config/db');

async function addAddressFields() {
    try {
        console.log('Checking and adding address fields to users table...');

        // Add address fields if they don't exist
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
            ADD COLUMN IF NOT EXISTS college_block VARCHAR(50),
            ADD COLUMN IF NOT EXISTS room_number VARCHAR(20),
            ADD COLUMN IF NOT EXISTS address_notes TEXT
        `);

        console.log('✅ Address fields checked/added successfully!');

        // Verify columns
        const result = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users'
            ORDER BY ordinal_position
        `);

        console.log('\nUsers table columns:');
        result.rows.forEach(row => {
            console.log(`  - ${row.column_name}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

addAddressFields();
