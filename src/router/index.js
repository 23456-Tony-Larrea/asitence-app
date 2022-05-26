import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Login/HomeView.vue'
import CrudRoleView from '../views/Role/CrudRoleView.vue'
import CrudUsersView from '../views/Users/CrudUsersView'
import CrudCourseView from '../views/Course/CrudCourseView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  },
  
  {
    path:'/courses',
    name:'CrudCourseView',
    component:CrudCourseView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
