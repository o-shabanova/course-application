  import { API_BASE_URL } from './constants';

  export async function getCourses() {
    const response = await fetch(`${API_BASE_URL}/courses/all`);

    if (!response.ok) {
      throw new Error(`Failed to fetch courses, status: ${response.status}`);
    }

    const data = await response.json();
    const result = Array.isArray(data.result)
    ? data.result
    : (Array.isArray(data) ? data : []);
  return result;
  }

  export async function getAuthors() {
    const response = await fetch(`${API_BASE_URL}/authors/all`);

    if (!response.ok) {
      throw new Error(`Failed to fetch authors, status: ${response.status}`);
    }

    const data = await response.json();
    const result = Array.isArray(data.result)
    ? data.result
    : (Array.isArray(data) ? data : []);
  return result;
  }