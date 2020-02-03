<template>
    <div>
        <div class="container">
            <div class="notification">
                <h1 class="title is-1 after-success-title">
                    Merci pour votre inscription sur notre site
                </h1>
                <p class="subtitle is-4 after-success-sub-title">
                    Vous allez recevoir un email de confirmation,
                    veuillez clique dessu pour activer votre compte
                    <br>
                    attention le lien est valable pendant 24H.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RegisterSuccess"
    }
</script>

<style>
.after-success-title {
    padding-top: 100px;
    padding-bottom: 100px;
    text-align: center;
}
.after-success-sub-title {
    padding-top: 100px;
    padding-bottom: 250px;
    text-align: center;
}

@media screen and (min-width: 200px) and (max-width: 576px) {
    .title.is-1 {
        font-size: 1.5rem;
    }

    .subtitle.is-4 {
        font-size: 1.2rem;
    }

    .after-success-title {
        padding-top: 50px;
        padding-bottom: 50px;
        text-align: center;
    }
    .after-success-sub-title {
        padding-top: 50px;
        padding-bottom: 250px;
        text-align: center;
    }
}
</style>