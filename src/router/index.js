import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import('../pages/Login.vue')
    },
    {
        path: "/",
        name: "Home",
        component: () => import('../layouts/Main.vue'),
        children: [
            {
                path: "/",
                name: "Home",
                component: () => import('../pages/Home.vue')
            },
            {
                path: "/team",
                name: "Team",
                component: () => import('../pages/Team.vue')
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;