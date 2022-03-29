import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Login/HomeView.vue'
import RegisterRoleView from '../views/Role/RegisterRoleView.vue'
import CrudProductsView from '../views/products/CrudProductsView'
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
   path:'/registerRole',
   name:'RegisterRoleView',
   component:RegisterRoleView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
