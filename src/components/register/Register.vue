<template>
    <div>
        <div class="container">
            <div class="notification">
                <div class="space-top"></div>
                <div class="space-top"></div>
                <div class="space-top"></div>
                <div class="space-top"></div>
                <div class="row dekstop">
                    <div class="col-md-6">
                        <h1 class="title is-2">
                            Bienvenue !
                        </h1>
                        <p class="subtitle is-5">
                            Créer un compte pour…
                        </p>
                        <div>
                            <router-link :to="{ name: 'particular'}">
                                Pour moi
                            </router-link>
                        </div>
                        <div>
                            <router-link :to="{ name: 'professional'}">
                                Pour une entreprise
                            </router-link>
                        </div>

                    </div>
                    <div class="col-md-6">
                        <h1 class="title is-3">
                            Vous avez déjà un compte ?
                        </h1>
                        <router-link to="/connexion" class="subtitle is-5">
                            Me connecter
                        </router-link>
                    </div>
                </div>
                <div class="mobile">
                    <h1 class="title is-3">Bienvenue</h1>
                    <p class="subtitle is-5">
                        Créer un compte pour…
                    </p>
                    <div>
                        <router-link :to="{ name: 'particular'}">
                            Pour moi
                        </router-link>
                        <br>
                        <router-link :to="{ name: 'professional'}">
                            Pour une entreprise
                        </router-link>
                    </div>
                    <br>
                    <br>
                    <div class="subtitle is-5">
                        <h1 class="title is-4">
                            Vous avez déjà un compte ?
                        </h1>
                        <router-link to="/connexion" class="subtitle is-5">
                            Me connecter
                        </router-link>
                    </div>
                </div>
                <div class="space-top"></div>
                <div class="space-top"></div>
                <div class="space-top"></div>
                <div class="space-top"></div>

                <div>
                    Vous agissez à titre professionnel ?
                    <router-link :to="{name: 'professional'}">
                        Créez plutôt un compte pro !
                    </router-link>

                </div>
                <br>
                <p>
                    À défaut, en application de l’article L 132-2 du Code de la
                    consommation qui sanctionne les pratiques commerciales trompeuses,
                    vous encourez une peine d’emprisonnement de 2 ans et une amende de 300 000 euros.
                </p>
                <div class="space-top"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register'
}
</script>

<style>
    .space-top {
        padding-top: 50px;
    }

    @media screen and (max-width: 768px) {
       .dekstop {
           display: none;
       }
    }
    @media screen and (min-width: 768px) {
        .mobile {
            display: none;
        }
    }
</style>