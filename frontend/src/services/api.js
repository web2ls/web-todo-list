import axios from 'axios';
import { ENV } from './env';

export const ApiService = {
    getCategories: function() {
        const url = `${ENV.BACKEND_URL}/categories`;
        return axios.get(url);
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
    }
}