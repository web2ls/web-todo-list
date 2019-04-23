import axios from 'axios';
import { ENV } from './env';

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return {'Authorization': `Bearer ${token}`};
}

export const ApiService = {
    getCategories: function() {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/categories`;
        return axios.get(url, {headers});
    },
    getTodosAmountByCategory(categoryId) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/todos/${categoryId}/amount`;
        return axios.get(url, {headers});
    },
    getTodosByCategory(categoryId) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/todos/${categoryId}`;
        return axios.get(url, {headers});
    },
    createCategory: function(newCategory) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/categories/create`;
        return axios.post(url, newCategory, {headers});
    },
    updateCategory(category) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/categories/update/${category._id}`;
        return axios.put(url, category, {headers});
    },
    deleteCategory(categoryId) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/categories/delete/${categoryId}`;
        return axios.delete(url, {headers});
    },
    createTodo(todo) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/todos/create`;
        return axios.post(url, todo, {headers});
    },
    updateTodo(todo) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/todos/update/${todo._id}`;
        return axios.put(url, todo, {headers});
    },
    deleteTodo(todoId) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/todos/delete/${todoId}`;
        return axios.delete(url, {headers});
    },
    deleteTodosByCategory(categoryId) {
        const headers = getAuthHeader();
        const url = `${ENV.BACKEND_URL}/todos/delete/bycategory/${categoryId}`;
        return axios.delete(url, {headers});
    },
    login(creds) {
        const url = `${ENV.BACKEND_URL}/auth`;
        return axios.post(url, creds);
    }
}