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

export type RegisterCredentials = {
    name: string;
    email: string;
    password: string;
};

export type RegisterResult = {
    result: string;
};

type LoginApiResponse = {
    result: string;
    user?: {
        name?: string;
        email?: string;
    };
    message?: string;
};

type RegisterApiResponse = {
    successful: boolean;
    result?: string;
    errors?: string[];
};

export class RegistrationError extends Error {
    errors: string[];

    constructor(errors: string[]) {
        super(errors.join(', '));
        this.errors = errors;
    }
}

async function postJson<T>(endpoint: string, body: unknown): Promise<{ response: Response; data: T }> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data: T = await response.json();

    return { response, data };
}

export async function registerUser(credentials: RegisterCredentials): Promise<RegisterResult> {
    const { response, data } = await postJson<RegisterApiResponse>(ENDPOINTS.REGISTER, credentials);

    if (!response.ok || !data.successful) {
        if (!data.successful && Array.isArray(data.errors)) {
            throw new RegistrationError(data.errors);
        }

        throw new Error('Registration failed. Please try again.');
    }

    return { result: data.result ?? '' };
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResult> {
    const { response, data } = await postJson<LoginApiResponse>(ENDPOINTS.LOGIN, credentials);

    if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
    }

    return {
        token: data.result,
        name: data.user?.name || '',
        email: data.user?.email || credentials.email,
    };
}

async function getAllData<T>(endpoint: string): Promise<T[]> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/all`);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}, status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data?.result)) {
        return data.result;
    }

    if (Array.isArray(data)) {
        return data;
    }

    return [];
}

export async function getCourses<T = unknown>() {
    return getAllData<T>(ENDPOINTS.COURSES);
}

export async function getAuthors<T = unknown>() {
    return getAllData<T>(ENDPOINTS.AUTHORS);
}
