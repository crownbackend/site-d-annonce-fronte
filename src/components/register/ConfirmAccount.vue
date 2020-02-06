<template>
    <div>
        <div class="container">
            <div class="notification">
{{this.$route.params.token}}
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
                console.log(response)

            })
            .catch(error => {
                console.log(error)
            })
        }
    }
</script>