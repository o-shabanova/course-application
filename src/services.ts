import { API_BASE_URL, ENDPOINTS } from './constants';
import { Course } from './store/courses/coursesSlice';


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

export async function postCourse(course: Course, token: string) {
    const response = await fetch(`${API_BASE_URL}/${ENDPOINTS.COURSES}/add`, {
        method: 'POST',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    });

    if(!response.ok) {
        throw new Error(`Failed to create course, status: ${response.status}`);
    }
    return response;
}

export async function getCourses() {
    return getAllData(ENDPOINTS.COURSES);
}

export async function getAuthors() {
    return getAllData(ENDPOINTS.AUTHORS);
}