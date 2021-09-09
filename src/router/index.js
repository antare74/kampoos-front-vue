import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue')
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import('@/views/auth/dashboard/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order',
        name: 'order',
        component: () => import('@/views/order/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: () => import('@/views/order/show.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/product/:slug',
        name: 'product',
        component: () => import('@/views/product/show.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import('@/views/category/index.vue')
    },
    {
        path: '/category/:slug',
        name: 'detail_category',
        component: () => import('@/views/category/show.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if (store.getters['auth/isLoggedIn']) {
            next()
            return
        }else {
            next
        }
    }
})

export default router