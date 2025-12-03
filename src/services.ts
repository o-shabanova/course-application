import { API_BASE_URL, ENDPOINTS } from './constants';


async function getData(endpoint: string,) {

    const response = await fetch(`${API_BASE_URL}/${endpoint}/all`);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}, status: ${response.status}`);
    }

    const data = await response.json();
    const result = Array.isArray(data.result)
        ? data.result
        : (Array.isArray(data) ? data : []);
    return result;
}

export async function getCourses() {
    return getData(ENDPOINTS.COURSES);
}

export async function getAuthors() {
    return getData(ENDPOINTS.AUTHORS);
}