import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import AuthUser from "../services/AuthUser"

const Register = () => import( "../components/register/Register")
const Particular = () => import( "../components/register/Particular")
const Professional = () => import( "../components/register/Professional")
const RegisterSuccess = () => import( "../components/register/RegisteSuccess")
const ConfirmAccount = () => import( "../components/register/ConfirmAccount")
const Index = () => import("../components/Index")
const Error404 = () => import("../components/Error404")
const AddAdvertisement = () => import("../components/advertisement/Add")
const Login = () => import("../components/security/Login")
const IndexAdvertisement = () => import("../components/advertisement/Index")

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
    component: Professional,
  },
  {
    path: '/inscription/success',
    name: "successRegister",
    component: RegisterSuccess,
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
  },
  {
    path: '/annonces/ajouter-une-nouvelle-annonce',
    name: "addAdvertisement",
    component: AddAdvertisement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/annonces/offres/:region",
    name: "indexAdvertisement",
    component: IndexAdvertisement
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    AuthUser.verifyToken()
        .then(response => {
          if(response.status === 500) {
            console.log('r')
          }

        })
        .catch(err => {
          if(err.response.status === 500) {
            store.dispatch('logout')
            next('/mon-compte/connexion')
          }
        });
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/mon-compte/connexion')
  } else {
    next()
  }
})

export default router
