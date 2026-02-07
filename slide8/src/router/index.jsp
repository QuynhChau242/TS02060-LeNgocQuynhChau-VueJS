import {createRouter, createWebHistory} from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/About.vue';

const router = createRouter({
    {
        path: '/',
        name:'Home',
        compoment: Home
    },
    {
        path: '/',
        name:'About',
        compoment: About
    }
})
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});