import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index";
import Register from "../components/register/Register";
import Particular from "../components/register/Particular";
import Professional from "../components/register/Professional";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/inscription',
    name: "register",
    component: Register
  },
  {
    path: '/inscription/partuclier',
    name: "particular",
    component: Particular
  },
  {
    path: '/inscription/professionnelle',
    name: "professional",
    component: Professional
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
