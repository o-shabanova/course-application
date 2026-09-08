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

export type RegisterResult =
    | { ok: true; result: string }
    | { ok: false; reason: 'validation'; errors: string[] }
    | { ok: false; reason: 'failed'; message: string };

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
            return { ok: false, reason: 'validation', errors: data.errors };
        }

        return { ok: false, reason: 'failed', message: 'Registration failed. Please try again.' };
    }

    return { ok: true, result: data.result ?? '' };
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

type DeleteCourseApiResponse = {
    successful?: boolean;
    result?: string;
};

export async function deleteCourseById(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${ENDPOINTS.COURSES}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    });

    const data: DeleteCourseApiResponse = await response.json().catch(() => ({}));

    if (!response.ok || data.successful === false) {
        throw new Error('Failed to delete course');
    }
}

export async function getAuthors<T = unknown>() {
    return getAllData<T>(ENDPOINTS.AUTHORS);
}

export type CreateCoursePayload = {
    title: string;
    description: string;
    duration: number;
    authors: string[];
};

export type CreateAuthorPayload = {
    name: string;
};

type CreateApiResponse<T> = {
    successful?: boolean;
    result?: T;
};

async function postAuthenticatedJson<T>(
    endpoint: string,
    body: unknown,
    token: string,
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(body),
    });

    const data: CreateApiResponse<T> = await response.json().catch(() => ({}));

    if (!response.ok || data.successful === false || data.result === undefined) {
        throw new Error(`Failed to create ${endpoint}`);
    }

    return data.result;
}

export async function createCourse<T>(payload: CreateCoursePayload, token: string): Promise<T> {
    return postAuthenticatedJson<T>(ENDPOINTS.COURSES_ADD, payload, token);
}

export async function updateCourse<T>(
    id: string,
    payload: CreateCoursePayload,
    token: string,
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${ENDPOINTS.COURSES}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(payload),
    });

    const data: CreateApiResponse<T> = await response.json().catch(() => ({}));

    if (!response.ok || data.successful === false || data.result === undefined) {
        throw new Error('Failed to update course');
    }

    return data.result;
}

export async function createAuthor<T>(payload: CreateAuthorPayload, token: string): Promise<T> {
    return postAuthenticatedJson<T>(ENDPOINTS.AUTHORS_ADD, payload, token);
}

export type CurrentUser = {
    name: string;
    email: string;
    role: string;
};

export type CurrentUserResult =
    | { ok: true; user: CurrentUser }
    | { ok: false; reason: 'unauthorized' | 'failed' };

const isUnauthorizedStatus = (status: number) => status === 401 || status === 403;

type CurrentUserApiResponse = {
    successful: boolean;
    result?: {
        name?: string;
        email?: string;
        role?: string;
    };
};

export async function logoutUser(token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${ENDPOINTS.LOGOUT}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to logout');
    }
}

export async function getCurrentUser(token: string): Promise<CurrentUserResult> {
    const response = await fetch(`${API_BASE_URL}/${ENDPOINTS.USERS_ME}`, {
        headers: {
            Authorization: token,
        },
    });

    if (isUnauthorizedStatus(response.status)) {
        return { ok: false, reason: 'unauthorized' };
    }

    const data: CurrentUserApiResponse = await response.json();

    if (!response.ok || !data.successful || !data.result) {
        return { ok: false, reason: 'failed' };
    }

    return {
        ok: true,
        user: {
            name: data.result.name || '',
            email: data.result.email || '',
            role: data.result.role || '',
        },
    };
}
