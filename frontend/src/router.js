import Vue from 'vue';
import Router from 'vue-router';

import Categories from '@/components/Categories.vue';
import Todos from '@/components/Todos.vue';
import Settings from '@/components/Settings.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'categories',
            component: Categories,
        },
        {
            path: '/todos/category/:id',
            name: 'todos',
            component: Todos
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            name: "not-found",
            component: NotFound
        },
    ],
});
