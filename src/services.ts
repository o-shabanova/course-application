import { API_BASE_URL, ENDPOINTS } from './constants';


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