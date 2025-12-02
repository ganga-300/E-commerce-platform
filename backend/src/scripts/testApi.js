const http = require('http');

const post = (path, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5001,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                console.log(`Response from ${path}:`, res.statusCode, body);
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    console.error('Failed to parse JSON:', body);
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(JSON.stringify(data));
        req.end();
    });
};

const get = (path, token) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5001,
            path: path,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
        });

        req.on('error', reject);
        req.end();
    });
};

const runTests = async () => {
    try {
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';

        console.log('1. Testing Register...');
        const registerRes = await post('/api/auth/register', {
            name: 'Test User',
            email,
            password,
        });
        console.log('Register Status:', registerRes.status);
        if (registerRes.status !== 201) throw new Error('Register failed');
        console.log('Register Success');

        console.log('\n2. Testing Login...');
        const loginRes = await post('/api/auth/login', {
            email,
            password,
        });
        console.log('Login Status:', loginRes.status);
        if (loginRes.status !== 200) throw new Error('Login failed');
        const token = loginRes.body.token;
        console.log('Login Success, Token received');

        console.log('\n3. Testing Get Me...');
        const meRes = await get('/api/auth/me', token);
        console.log('Get Me Status:', meRes.status);
        console.log('User:', meRes.body.email);
        if (meRes.status !== 200) throw new Error('Get Me failed');
        if (meRes.body.email !== email) throw new Error('Email mismatch');
        console.log('Get Me Success');

        console.log('\nAll tests passed!');
    } catch (err) {
        console.error('Test failed:', err.message);
        process.exit(1);
    }
};

runTests();
