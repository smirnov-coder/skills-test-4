import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/search',
        component: SearchPage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
