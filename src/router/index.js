import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import playvideo from "@/views/playvideo";
import upload from "@/views/upload";
import mainpage from "@/views/mainpage";
import event from "@/views/event";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/playvideo',
    name: 'playvideo',
    component: playvideo
  },
  {
    path: '/upload',
    name: 'upload',
    component: upload
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    component: mainpage
  },
  {
    path: '/event',
    name: 'event',
    component: event
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
