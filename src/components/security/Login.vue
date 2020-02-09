<template>
    <div>
        <div class="container">
            <div class="notification">
                <h1 class="title is-1 has-text-centered">Connexion</h1>
                <form method="post" @submit.prevent="login">
                    <div class="is-divider is-primary"></div>
                    <div class="field">
                        <label for="email" class="label">Adresse email</label>
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="email" id="email" placeholder="Email" v-model="email">
                            <span class="icon is-small is-left">
                          <i class="fas fa-envelope"></i>
                        </span>
                        </p>
                    </div>
                    <br>
                    <div class="field">
                        <label for="password" class="label">Mot de passe</label>
                        <p class="control has-icons-left">
                            <input class="input" type="password" id="password" placeholder="Mot de passe" v-model="password">
                            <span class="icon is-small is-left">
                         <i class="fas fa-lock"></i>
                        </span>
                        </p>
                    </div>
                    <div class="field">
                        <a href="#">
                            Mot de passe oublier
                        </a>
                    </div>
                    <div class="error" v-if="errorMessage">{{errorMessage}}</div>
                    <br>
                    <div class="field">
                        <p class="control">
                            <button class="button is-fullwidth is-primary" v-bind:class="{'is-loading': loading}" >
                                Se connecter
                            </button>
                        </p>
                    </div>
                </form>

                <div class="is-divider"></div>
                <div>
                    <router-link to="/inscription" class="button is-fullwidth is-primary">
                        Créer un compte
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//    import AuthUser from "../../services/AuthUser";

    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                loading: false,
                errorMessage: null
            }
        },
        methods: {
            login() {
                let email = this.email;
                let password = this.password;

                if(this.validEmail(email) && this.password_check(password) === 1) {
                    this.loading = true
                    this.$store
                        .dispatch("login", { email, password }, this.loading)
                        .then(response => {
                            if(response.data.enable === 0) {
                                this.errorMessage = "Votre compte na pas encore été activé."
                                this.loading = false
                            } else if(response.data.notAccount === 0) {
                                this.errorMessage = "Utilisateur non trouvé veuillez vous créer un compte."
                                this.loading = false
                            } else if(response.data.errorLogin === 0) {
                                this.errorMessage = "Votre identifiant ou mot de passe est incorrect."
                                this.loading = false
                            } else {
                                this.$router.push('/')
                                this.loading = false
                            }
                        })
                        .catch(err =>  {
                            if(err.response.data.enable === 0) {
                                this.errorMessage = "Votre compte na pas encore été activé."
                                this.loading = false
                            } else if(err.response.data.notAccount === 0) {
                                this.errorMessage = "Utilisateur non trouvé veuillez vous créer un compte."
                                this.loading = false
                            } else if(err.response.data.errorLogin === 0) {
                                this.errorMessage = "Votre identifiant ou mot de passe est incorrect."
                                this.loading = false
                            } else {
                                this.errorMessage = "Erreur serveur veuillez recommencé plus tard."
                                this.loading = false
                            }

                        });
                } else {
                    this.errorMessage = "Votre identifiant ou mot de passe est incorrect."
                }
            },
            validEmail(email) {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            password_check(pass) {
                let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/;
                if (regex.exec(pass) == null) {
                    return 0;
                }
                else {
                    return 1
                }
            },
        }
    }
</script>

