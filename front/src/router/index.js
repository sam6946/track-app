import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import LoginRegister from '../views/LoginRegister.vue'
import Notification from '../views/Notification.vue'
import Depot from '../views/Depot.vue'
import Retrait from '../views/Retrait.vue'
import Statistique from '../views/Statistique.vue'
import Historique from '../views/Historique.vue'
import Aide from '../views/Aide.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/loginRegister',
    name: 'loginRegister',
    component: LoginRegister
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notification
  },
  {
    path: '/depot',
    name: 'depot',
    component: Depot
  },
  {
    path: '/retrait',
    name: 'retrait',
    component: Retrait
  },
  {
    path: '/statistique',
    name: 'statistique',
    component: Statistique
  },
  {
    path: '/historique',
    name: 'historique',
    component: Historique
  },
  {
    path: '/aide',
    name: 'aide',
    component: Aide
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.fullPath === '/dashboard'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/loginRegister'){
    if(localStorage.getItem('user')){
      next('/dashboard')
    }
  }
  if(to.fullPath === '/depot'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/statitique'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/retrait'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/notification'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '/historique'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }
  if(to.fullPath === '*'){
    if(!localStorage.getItem('user')){
      next('/')
    }
  }


  next()
})

export default router
