import Router from 'vue-router'
import Vue from 'vue'
import login from '~/app/views/login.vue'
import Layout from '~/app/views/layout.vue'
import Quick from '~/app/views/quick.vue'
import Users from '~/app/views/users.vue'
import Roles from '~/app/views/roles.vue'
import Session from '~/app/services/sessionServices'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'loginViews',
            component: login,
            meta: {
                requireAuth: false
            }
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
                        bcrumd: ['平台状态'],
                        requireAuth: true
                    }
                },
                {
                    path: '/users',
                    name: 'Users',
                    component: Users,
                    meta: {
                        bcrumd: ['用户列表'],
                        requireAuth: true
                    }
                },
                {
                    path: '/roles',
                    name: 'roles',
                    component: Roles,
                    meta: {
                        bcrumd: ['角色列表'],
                        requireAuth: true
                    }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        const isLogin = Session.get('isLogin')
        if (isLogin) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})
export default router