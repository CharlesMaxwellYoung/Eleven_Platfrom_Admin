import Router from 'vue-router'
import Vue from 'vue'
import login from '~/app/views/login.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'loginViews',
            component: login
        }
    ]
})

export default router