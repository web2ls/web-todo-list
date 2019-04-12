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
    createCategory: function(newCategory) {
        const url = `${ENV.BACKEND_URL}/categories/create`;
        return axios.post(url, newCategory);
    }
}