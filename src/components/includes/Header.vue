<template>
    <div>
        <div class="navbar-menu" id="navMenu">
            <!-- navbar-start, navbar-end... -->
        </div>
        <header class="header">
            <div class="container">
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <router-link to="/" class="navbar-item">
                            <img src="../../assets/logo.png" width="112" height="28">
                        </router-link>

                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-start">
                            <router-link :to="{name: 'addAdvertisement'}" class="navbar-item">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                Déposer une annonce
                            </router-link>

                            <a class="navbar-item">
                                <i class="fas fa-search-plus"></i>
                                Rechercher
                            </a>

                        </div>

                        <div class="navbar-end">
                            <div class="navbar-item">
                                <a class="navbar-item" v-if="isLoggedIn">
                                    Mes recherches
                                    <i class="fas fa-bell"></i>
                                </a>
                                <a class="navbar-item" v-if="isLoggedIn">
                                    Favoris
                                    <i class="fas fa-heart"></i>
                                </a>
                                <a class="navbar-item" v-if="isLoggedIn">
                                    Messages
                                    <i class="fas fa-comments"></i>
                                </a>
                                <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
                                    <a class="navbar-link">
                                        {{username}}
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </a>

                                    <div class="navbar-dropdown">
                                        <a class="navbar-item">
                                           Mes annonces
                                        </a>
                                        <a class="navbar-item">
                                            Mon compte
                                        </a>
                                        <hr class="navbar-divider">
                                        <a class="navbar-item" @click="logout">
                                            Se déconnecter
                                        </a>
                                    </div>

                                </div>
                                <div class="buttons" v-else>
                                    <router-link class="button is-primary" to="/inscription">
                                        <strong>Inscription</strong>
                                    </router-link>
                                    <router-link to="/mon-compte/connexion" class="button is-light">
                                        Connexion
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

    </div>
</template>

<script>

    export default {
        name: "Header",
        data() {
            return {
                username: null
            }
        },
        mounted() {
            document.addEventListener('DOMContentLoaded', () => {

                // Get all "navbar-burger" elements
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

                // Check if there are any navbar burgers
                if ($navbarBurgers.length > 0) {

                    // Add a click event on each of them
                    $navbarBurgers.forEach( el => {
                        el.addEventListener('click', () => {

                            // Get the target from the "data-target" attribute
                            const target = el.dataset.target;
                            const $target = document.getElementById(target);

                            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                            el.classList.toggle('is-active');
                            $target.classList.toggle('is-active');

                        });
                    });
                }

            });
            if(localStorage.getItem("user")) {
                this.username = localStorage.getItem("user")
            }
        },
        computed: {
            isLoggedIn(){
                return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push({path: "/"})
                    })
            },
        }
    }
</script>

<style>
    .header {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.15);
    }
    .navbar-item {
        font-size: 0.9rem
    }

</style>