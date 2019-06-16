import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './components/Login.vue'),
            meta: { notRequiresAuth: true },
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import(/* webpackChunkName: "about" */ './components/admin/Panel.vue'),
            meta: { notRequiresAuth: true },
        },
        {
            path: '/',
            name: 'main',
            component: Main,
        },
    ]
});

let a = false;

router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.notRequiresAuth)) {
        Vue.nextTick(()=>{
            if (a) {
                next({
                    path: '/login'
                })
            } else {
                next()
            }
        })
    } else {
        next()
    }
});

export default router;
