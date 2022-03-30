import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Login/HomeView.vue'
import CrudRoleView from '../views/Role/CrudRoleView.vue'
import CrudProductsView from '../views/Products/CrudProductsView'
import CrudUsersView from '../views/Users/CrudUsersView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/products',
    name:'CrudProductsView',
    component:CrudProductsView
  },
  {
   path:'/roles',
   name:'RegisterRoleView',
   component:CrudRoleView
  },
  {
    path:'/users',
    name:'CrudUsersView',
    component:CrudUsersView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
