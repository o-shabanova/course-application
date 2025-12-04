export const BUTTON_TEXT = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SEARCH: 'SEARCH',
    SHOW_COURSE: 'SHOW COURSE',
    ADD_NEW_COURSE: 'ADD NEW COURSE',
    CREATE_AUTHOR: 'CREATE AUTHOR',
    CREATE_COURSE: 'CREATE COURSE',
    DELETE_COURSE: 'DELETE',
    UPDATE_COURSE: 'UPDATE',
    CANCEL: 'CANCEL',
    BACK: 'BACK',
    EMPTY: '',
    REGISTER: 'REGISTER',
    ADD_AUTHOR: 'Add author',
    DELETE_AUTHOR: 'Delete author'
} as const;

export const API_BASE_URL = 'http://localhost:4000';

export const ENDPOINTS = {
    AUTHORS: 'authors',
    COURSES: 'courses'
} as const;