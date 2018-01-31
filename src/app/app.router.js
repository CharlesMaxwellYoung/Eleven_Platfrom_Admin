import Router from 'vue-router'
import Vue from 'vue'
import login from '~/app/views/login.vue'
import Layout from '~/app/views/layout.vue'
import Quick from '~/app/views/quick.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'loginViews',
            component: login
        },
        {
            path: '/',
            name: 'Layout',
            component: Layout,
            children: [
                {
                    path: '/quick',
                    name: 'Quick',
                    component: Quick,
                    meta: {
                        bcrumd: ['平台状态']
                    }
                }
            ]
        }
    ]
})

export default router