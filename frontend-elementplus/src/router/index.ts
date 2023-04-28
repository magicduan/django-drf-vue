import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hello/:msg',
      name: 'HellowWorld',
      component: () => import("../components/HelloWorld.vue"),
      props: true
    },
    {
      path: '/author/:username',
      name: 'AuthorView',
      component: ()=>import("../views/AuthorView.vue")
    },
    {
      path: '/post/:slug',
      name: 'PostView',
      component: ()=>import("../views/PostView.vue")
    },
    {
      path: '/tag/:tag',
      name: 'PostByTag',
      component: ()=>import("../views/PostsByTag.vue")
    },
    {
      path: '/posts',
      name: 'AllPosts',
      component: ()=>import("../views/AllPosts.vue")
    }      
  ]
})

export default router
