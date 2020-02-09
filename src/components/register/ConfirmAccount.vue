<template>
    <div>
        <div class="container">
            <div class="notification">
                <h1 class="title is-1 space-message">
                    {{message}}
                </h1>
                <p class="subtitle is-4 space-redirect">
                    Pour vous connecter veuillez cliquer ici :
                    <router-link to="/mon-compte/connexion">
                        Connecter vous à votre compte
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";

    export default {
        name: "ConfirmAccount",
        data() {
            return {
                message: null
            }
        },
        created() {
            UserApi.confirmUser(this.$route.params.token)
            .then(response => {
                if(response.data.confirmation === 1) {
                    this.message = "Votre compte à bien été activé avec succès vous pouvez désormé vous connecté."
                } else {
                    this.message = "Votre compte à déja été activé si vous rencontrée un problème veuillez contacter le support technique."
                }

            })
            .catch(() => {
                alert('Une erreur est arrivé veuillez réessayer plus tard')
            })
        }
    }
</script>

<style>
    .space-message {
        padding-top: 50px;
        padding-bottom: 50px;
    }
    .space-redirect {
        padding-top: 50px;
        padding-bottom: 50px;
    }
</style>