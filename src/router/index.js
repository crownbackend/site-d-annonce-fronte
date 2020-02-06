import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index";
import Register from "../components/register/Register";
import Particular from "../components/register/Particular";
import Professional from "../components/register/Professional";
import RegisteSuccess from "../components/register/RegisteSuccess";
import Login from "../components/security/Login";
import store from '../store/index'
import ConfirmAccount from "../components/register/ConfirmAccount";
import Error404 from "../components/Error404";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: "*",
    name: "error404",
    component: Error404
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
  },
  {
    path: '/inscription/success',
    name: "successRegister",
    component: RegisteSuccess,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mon-compte/connexion',
    name: "login",
    component: Login
  },
  {
    path: '/register/after-register/verification/:token',
    name: "verifyToken",
    component: ConfirmAccount
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
