import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
// 房子模块
import NewHouse from '../views/NewHouse'
import houseDetails from '../views/houseDetails'
import sellHouse from '../views/sellHouse'
// 房聊模块
import Fatie from '../views/fatie'
import Xiangqing from '../views/xiangqing'
import Taolun from '../views/taolun'
import Xuanze from '../views/xuanze'
// 个人中心模块
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Personal from '../views/Personal.vue'
import Trigrams from '../views/Trigrams.vue'
import Content from '../views/Content.vue'
import Datatwo from '../views/Datatwo.vue'
Vue.use(VueRouter)
  const routes = [
    {
      path: '/datatwo',
      component: Datatwo
    },
    
    {
      path: '/personal',
      component: Personal
    },
    {
      path: '/trigrams',
      component: Trigrams
    },
    {
      path: '/content/:lid',
      component: Content
    },
    {
      path: '/reg',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/xuanze',
      component:Xuanze
    },
    {
      path:'/taolun',
      component:Taolun
    },
    {
      path:'/xiangqing',
      component:Xiangqing
    },
    {
      path:'/fatie',
      component:Fatie
    },
    {
      path:'/sellHouse/',
      component:sellHouse
    },
    {
      path:'/houseDetails/:id',
      component:houseDetails
    }, 
   
  {
    path:'/newhouse',
    component:NewHouse
  },
  {
    path: '/',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
 
]

const router = new VueRouter({
  mode:'history',//hash有#号，history没有#
  routes
})

export default router
