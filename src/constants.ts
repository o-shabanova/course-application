export const BUTTON_TEXT = {
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    SEARCH: 'Search',
    SHOW_COURSE: 'Show course',
    ADD_NEW_COURSE: 'Add new course',
    CREATE_AUTHOR: 'Create author',
    CREATE_COURSE: 'Create course',
    DELETE_COURSE: 'Delete course',
    UPDATE_COURSE: 'Update course',
    CANCEL: 'Cancel',
    BACK: 'Back',
    EMPTY: '',
    REGISTER: 'Register',
    ADD_AUTHOR: 'Add author',
    DELETE_AUTHOR: 'Delete author'
} as const;

export const API_BASE_URL = 'http://localhost:4000';

export const ENDPOINTS = {
    AUTHORS: 'authors',
    COURSES: 'courses',
    LOGIN: 'login',
    REGISTER: 'register',
} as const;