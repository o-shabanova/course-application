import { API_BASE_URL, ENDPOINTS } from './constants';


async function getAllData(endpoint: string,) {

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

export async function deleteCourseById(courseId: string, token: string) {

    const response = await fetch(`${API_BASE_URL}/${ENDPOINTS.COURSES}/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}`,
        },
    });


    if (!response.ok) {
        throw new Error(`Failed to delete course, status: ${response.status}`);
    }

    return response;
}

export async function getCourses() {
    return getAllData(ENDPOINTS.COURSES);
}

export async function getAuthors() {
    return getAllData(ENDPOINTS.AUTHORS);
}