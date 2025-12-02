const { pool } = require('../config/db');

async function verifySchema() {
    try {
        console.log('Verifying database schema...\n');

        // Check orders table
        const ordersCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'orders'
            )
        `);

        if (ordersCheck.rows[0].exists) {
            console.log('✅ orders table exists');
        } else {
            console.log('❌ orders table missing - creating...');
            await pool.query(`
                CREATE TABLE orders (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    total_amount INTEGER NOT NULL,
                    payment_method VARCHAR(50) NOT NULL,
                    status VARCHAR(50) DEFAULT 'confirmed',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('✅ orders table created');
        }

        // Check order_items table
        const itemsCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'order_items'
            )
        `);

        if (itemsCheck.rows[0].exists) {
            console.log('✅ order_items table exists');
        } else {
            console.log('❌ order_items table missing - creating...');
            await pool.query(`
                CREATE TABLE order_items (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
                    product_name VARCHAR(255) NOT NULL,
                    quantity INTEGER NOT NULL,
                    price_at_purchase INTEGER NOT NULL
                )
            `);
            console.log('✅ order_items table created');
        }

        // Check tracking table
        const trackingCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'tracking'
            )
        `);

        if (trackingCheck.rows[0].exists) {
            console.log('✅ tracking table exists');
        } else {
            console.log('❌ tracking table missing - creating...');
            await pool.query(`
                CREATE TABLE tracking (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
                    stage VARCHAR(50) NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('✅ tracking table created');
        }

        console.log('\n🎉 Database schema verification complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

verifySchema();
