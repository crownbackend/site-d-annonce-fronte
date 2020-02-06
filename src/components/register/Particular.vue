<template>
    <div>
        <div class="container">
            <div class="notification">
                <div>
                    <form method="post" @submit.prevent="sendForm" @change="checkFormValid">
                        <div class="field">
                            <label class="label" for="username">Nom d'utilisateur</label>
                            <div class="control">
                                <input id="username" class="input" v-on:keyup="verifyUsername" max="50" type="text" placeholder="ex : Jean-paule" v-model="username">
                            </div>
                            <p class="help is-danger">{{usernameMessageError}}</p>
                        </div>

                        <div class="field">
                            <label class="label" for="email">Email</label>
                            <div class="control">
                                <input id="email" class="input" type="text" v-on:keyup="verifyEmail" placeholder="Email" v-model="email">
                            </div>
                            <p class="help is-danger">{{emailMessageError}}</p>
                        </div>
                        <div class="field">
                            <label class="label" for="password">Mot de passe</label>
                            <div class="control">
                                <i class="far fa-eye" id="Bloc1" @click="showPassword"></i>
                                <input id="password" class="input" type="password" v-on:keyup="verifyPassword" v-model="password" placeholder="Mot de passe">
                                <p class="help is-danger">{{passwordMessageError}}</p>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" for="dateBirthday">Date de naissance</label>
                            <div class="control">
                                <input id="dateBirthday" class="input" type="text" placeholder="jj/mm/aaaa" v-on:keyup="verifyDate" v-model="date">
                            </div>
                            <p class="help is-danger">{{dateMessageError}}</p>
                        </div>

                        <div class="field">
                            <input class="is-checkradio" id="exampleCheckbox" v-model="condition" type="checkbox">
                            <label for="exampleCheckbox">
                                « J’accepte les <a href="#">Conditions Générales de Vente</a>
                                et les <a href="#">Conditions Générales d‘Utilisation</a> »
                            </label>
                        </div>

                        <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" :disabled="!formValid">Créer mon compte</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi"
    import moment from "moment"
    export default {
        name: "Particular",
        data() {
            return {
                email: null,
                emailMessageError: null,
                username: null,
                usernameMessageError: null,
                password: null,
                passwordMessageError: null,
                date: null,
                dateMessageError: null,
                condition: false,
                emailGood: false,
                usernameGood: false,
                passwordGood: false,
                dateGood: false,
                formValid: false,
            }
        },
        methods: {
            checkFormValid() {
                if(this.emailGood && this.usernameGood && this.passwordGood && this.condition && this.dateGood) {
                    this.formValid = true
                } else {
                    this.formValid = false
                }
            },
            sendForm() {
                UserApi.registerParticular(this.username, this.email, this.password, this.date)
                .then(response => {
                    // if(response.data.created === 1) {
                    //     this.$router.push({path: "/inscription/success"})
                    // }
                    console.log(response)
                })
                .catch(error => {
                    alert(error.response)
                })
            },
            verifyEmail() {
                if(!this.validEmail(this.email)) {
                    this.emailMessageError = "Email non valid"
                    this.emailGood = false
                } else {
                    UserApi.verifyEmail(this.email)
                        .then(response => {
                            if(response.data.error === 1) {
                                this.emailMessageError = response.data.message
                                this.emailGood = false
                            } else {
                                this.emailMessageError = null
                                this.emailGood = true
                            }
                        })
                        .catch(error => {
                            this.emailGood = false
                            alert(error.response)
                        })
                }
            },
            verifyUsername() {
                if(this.username.length < 2) {
                    this.usernameMessageError = "Le nom d’utilisateur est trop court. Veuillez saisir au moins 2 caractères.\n";
                    this.usernameGood = false
                } else {
                    UserApi.verifyUsername(this.username)
                        .then(response => {
                            if(response.data.error === 1) {
                                this.usernameMessageError = response.data.message
                                this.usernameGood = false
                            } else {
                                this.usernameMessageError = null
                                this.usernameGood = true
                            }

                        })
                        .catch(error => {
                            this.usernameGood = false
                            alert(error.response)
                        })
                }
            },
            verifyPassword() {
                if(this.password_check(this.password)) {
                    this.passwordMessageError = null
                    this.passwordGood = true
                } else {
                    this.passwordGood = false
                    this.passwordMessageError = "le mot de passe doit contenir 8 caractères minimum\n" +
                        "1 chiffre minimum\n" +
                        "1 lettre minimum\n" +
                        "1 lettre majuscule\n" +
                        "50 caractères maximum"
                }

            },
            verifyDate() {
                let now = moment();
                let date = moment(this.date);
                 if (now < date) {
                    this.dateMessageError = "Veuillez saisir une date correcte."
                    this.dateGood = false
                } else if(!moment(this.date, 'DD/MM/YYYY',true).isValid()) {
                     this.dateMessageError = "Veuillez saisir une date correcte."
                     this.dateGood = false
                 } else {
                     this.dateMessageError = null
                     this.dateGood = true
                 }
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            showPassword() {
                var temp = document.getElementById("password");
                if (temp.type === "password") {
                    temp.type = "text";
                }
                else {
                    temp.type = "password";
                }
            },
        },
    }
</script>

<style>
    #Bloc1 {
        float:right ;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
    }
</style>