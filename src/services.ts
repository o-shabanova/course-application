import { API_BASE_URL, ENDPOINTS } from './constants';

export type LoginCredentials = {
    email: string;
    password: string;
};

export type LoginResult = {
    token: string;
    name: string;
    email: string;
};

export async function loginUser(credentials: LoginCredentials): Promise<LoginResult> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Login failed. Please try again.');
    }

    return {
        token: result.result,
        name: result.user?.name || '',
        email: result.user?.email || credentials.email,
    };
}

async function getAllData(endpoint: string,) {

    const response = await fetch(`${API_BASE_URL}/${endpoint}/all`);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}, status: ${response.status}`);
    }

    const data = await response.json();

    let result = [];

    if (Array.isArray(data?.result)) {
        result = data.result;
    } else if (Array.isArray(data)) {
        result = data;
    }

    return result;
}

export async function getCourses() {
    return getAllData(ENDPOINTS.COURSES);
}

export async function getAuthors() {
    return getAllData(ENDPOINTS.AUTHORS);
}