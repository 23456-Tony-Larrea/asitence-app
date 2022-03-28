import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/login/HomeView.vue'
import Register from '../views/login/RegisterView.vue'
import DashboardView from '../views/role/DashboardView.vue'
import EditRoleView from '../views/role/EditRoleView.vue'
import NewRoleView from '../views/role/NewRoleView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
 {
    path: '/register',
    name: 'register',
    component: Register
 },
 {
   path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView
 },

  {
    path:'/edit/:id',
    name:'EditRoleView',
    component:EditRoleView
  },
  {
    path:'/newRole',
    name:'NewRoleView',
    component:NewRoleView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
