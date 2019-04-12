import axios from 'axios';
import { ENV } from './env';

export const ApiService = {
    createCategory: function(newCategory) {
        console.log('new category is created');
        const url = `${ENV.BACKEND_URL}/categories/create`;
        return axios.post(url, newCategory);
    }
}