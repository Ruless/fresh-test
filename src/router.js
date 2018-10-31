import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            component: () => import('./pages/Main.vue'),
            children: [
                {
                    path: '',
                    component: () => import('./components/Step1.vue'), 
                },
                {
                    path: 'step2',
                    component: () => import('./components/Step2.vue'), 
                },
                {
                    path: 'step3',
                    component: () => import('./components/Step3.vue'), 
                }
            ]
        },
    ]

    })

export default router;