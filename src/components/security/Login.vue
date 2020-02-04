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
                    <div class="field">
                        <p class="control">
                            <button class="button is-fullwidth is-primary">
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
    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null
            }
        },
        methods: {
            login() {
                let email = this.email;
                let password = this.password;
                this.$store
                    .dispatch("login", { email, password })
                    .then(() => this.$router.push("/"))
                    .catch(err => console.log(err));
            }
        }
    }
</script>
