const API_URL = 'http://localhost:5001/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const orderService = {
    async createOrder(orderData: {
        items: Array<{ name: string; quantity: number; price: number }>;
        totalAmount: number;
        paymentMethod: string;
        deliveryDetails?: {
            phone: string;
            collegeBlock: string;
            roomNumber: string;
            notes: string;
        };
    }) {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create order');
        }

        return response.json();
    },

    async getUserOrders() {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch orders');
        }

        return response.json();
    },

    async getOrderDetails(orderId: string) {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch order details');
        }

        return response.json();
    },

    async updateUserAddress(addressData: {
        phone: string;
        collegeBlock: string;
        roomNumber: string;
        notes: string;
    }) {
        const response = await fetch(`${API_URL}/auth/address`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(addressData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update address');
        }

        return response.json();
    },
};
