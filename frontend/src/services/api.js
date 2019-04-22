import axios from 'axios';
import { ENV } from './env';

export const ApiService = {
    getCategories: function() {
        const token = localStorage.getItem('token');
        const headers = {'Authorization': `Bearer ${token}`};
        const url = `${ENV.BACKEND_URL}/categories`;
        console.log(headers);
        return axios.get(url, {headers});
    },
    getTodosAmountByCategory(categoryId) {
        const url = `${ENV.BACKEND_URL}/todos/${categoryId}/amount`;
        return axios.get(url);
    },
    getTodosByCategory(categoryId) {
        const url = `${ENV.BACKEND_URL}/todos/${categoryId}`;
        return axios.get(url);
    },
    createCategory: function(newCategory) {
        const url = `${ENV.BACKEND_URL}/categories/create`;
        return axios.post(url, newCategory);
    },
    updateCategory(category) {
        const url = `${ENV.BACKEND_URL}/categories/update/${category._id}`;
        return axios.put(url, category);
    },
    deleteCategory(categoryId) {
        const url = `${ENV.BACKEND_URL}/categories/delete/${categoryId}`;
        return axios.delete(url);
    },
    createTodo(todo) {
        const url = `${ENV.BACKEND_URL}/todos/create`;
        return axios.post(url, todo);
    },
    updateTodo(todo) {
        const url = `${ENV.BACKEND_URL}/todos/update/${todo._id}`;
        return axios.put(url, todo);
    },
    deleteTodo(todoId) {
        const url = `${ENV.BACKEND_URL}/todos/delete/${todoId}`;
        return axios.delete(url);
    },
    deleteTodosByCategory(categoryId) {
        const url = `${ENV.BACKEND_URL}/todos/delete/bycategory/${categoryId}`;
        return axios.delete(url);
    },
    login(creds) {
        const url = `${ENV.BACKEND_URL}/auth`;
        return axios.post(url, creds);
    }
}