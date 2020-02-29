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
const ForgotYourPassword = () => import("../components/security/ForgotYourPassword")
const ConfirmPassword = () => import('../components/security/ConfirmPassword')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: {
      title: "Accueil"
    }
  },
  {
    path: "*",
    name: "error404",
    component: Error404,
    meta: {
      title: "Erreur 404"
    }
  },
  {
    path: '/inscription',
    name: "register",
    component: Register,
    meta: {
      title: "Inscription"
    }
  },
  {
    path: '/inscription/partuclier',
    name: "particular",
    component: Particular,
    meta: {
      title: "Particulier, Création de compte"
    }
  },
  {
    path: '/inscription/professionnelle',
    name: "professional",
    component: Professional,
    meta: {
      title: "Professionnels, Création de compte"
    }
  },
  {
    path: '/inscription/success',
    name: "successRegister",
    component: RegisterSuccess,
    meta: {
      title: "Inscription réussie"
    }
  },
  {
    path: '/mon-compte/connexion',
    name: "login",
    component: Login,
    meta: {
      title: "Connexion"
    }
  },
  {
    path: "/mon-compte/mot-de-de-passe-oublier",
    name: "forgotPassword",
    component: ForgotYourPassword,
    meta: {
      title: "Mot de passe oublié"
    }
  },
  {
    path: "/mon-compte/mot-de-de-passe-oublier/verification/:token",
    name:"verifyPassword",
    component: ConfirmPassword,
    meta: {
      title: "Récupération de mot de passe"
    }
  },
  {
    path: '/register/after-register/verification/:token',
    name: "verifyToken",
    component: ConfirmAccount,
    meta: {
      title: "Confirmation de votre compte"
    }
  },
  {
    path: '/annonces/ajouter-une-nouvelle-annonce',
    name: "addAdvertisement",
    component: AddAdvertisement,
    meta: {
      requiresAuth: true,
      title: "Ajouter votre annonce"
    }
  },
  {
    path: "/annonces/offres/:region",
    name: "indexAdvertisement",
    component: IndexAdvertisement
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// check token is valid
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

// change title document
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
