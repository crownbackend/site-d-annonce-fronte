<template>
    <div>
        <div class="container">
            <div class="notification">
                <div>
                    <form method="post" @change="checkFormValid" @submit.prevent="sendForm">
                        <h1 class="title is-2">
                            Créez votre Compte Professionnel
                        </h1>
                        <p class="subtitle is-5 has-text-primary">
                            Vos coordonnées
                        </p>
                        <div class="field">
                            <div class="subtitle is-6">
                                Civilité
                            </div>
                            <input class="is-checkradio" id="exampleRadioInline1" type="radio" v-model="civility" value="1">
                            <label for="exampleRadioInline1">M.</label>
                            <input class="is-checkradio" id="exampleRadioInline2" type="radio" v-model="civility" value="2">
                            <label for="exampleRadioInline2">Mme</label>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="field">
                                    <label class="label" for="firstName">Nom</label>
                                    <div class="control">
                                        <input id="firstName" class="input" type="text" v-on:keyup="verifyFirstName" v-model="firstName">
                                    </div>
                                    <p class="help is-danger">{{firstNameMessageError}}</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="field">
                                    <label class="label" for="lastName">Prénom</label>
                                    <div class="control">
                                        <input id="lastName" class="input" type="text" v-on:keyup="verifyLastName" v-model="lastName">
                                    </div>
                                    <p class="help is-danger">{{lastNameMessageError}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="field">
                                    <label class="label" for="company">Nom de la société</label>
                                    <div class="control">
                                        <input id="company" class="input" type="text" v-on:keyup="verifyCompany" v-model="company" placeholder="C'est le nom qui apparaîtra sur vos annonces.">
                                    </div>
                                    <p class="help is-danger">{{companyMessageError}}</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="field">
                                    <label class="label" for="siert">SIERT</label>
                                    <div class="control">
                                        <input id="siert" class="input" type="text" v-model="siret" v-on:keyup="verifySiret">
                                    </div>
                                    <p class="help is-danger">{{siretMessageError}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <div class="select is-fullwidth">
                                <label for="rubric" class="label">Rubrique</label>
                                <select id="rubric" v-model="rubric" v-on:change="verifyRubric">
                                    <option :value="null">Sélectionner la rubrique associée à votre activité professionnelle</option>
                                    <option v-for="(item, index) in rubricItems" v-bind:key="index" :value="index">{{item}}</option>
                                </select>
                            </div>
                            <p class="help is-danger" v-if="rubricMessageError">
                                <br>
                                <br>
                                {{rubricMessageError}}
                            </p>
                        </div>
                        <br>
                        <div class="field">
                            <label class="label" for="address">Adresse</label>
                            <div class="control">
                                <input id="address" class="input" type="text" v-model="address" v-on:keyup="verifyAddress">
                            </div>
                            <p class="help is-danger">{{addressMessageError}}</p>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="field">
                                    <label class="label" for="city">Ville ou code postal</label>
                                    <div class="control">
                                        <input id="city" class="input" type="text" v-model="city" v-on:keyup="verifyCity">
                                    </div>
                                    <p class="help is-danger">{{cityMessageError}}</p>
                                    <div class="content-city" v-if="cityItems">
                                        <ul class="list-city">
                                            <li @click="selectCity(city.name)" class="city" v-for="city in cityItems" v-bind:key="city.id">
                                                {{city.name}} ({{city.zipCode}})
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="field">
                                    <label class="label" for="telephone">Téléphone</label>
                                    <div class="control">
                                        <input id="telephone" class="input" type="text" v-on:keyup="verifyNumber" v-model="telephone">
                                    </div>
                                    <p class="help is-danger">{{telephoneMessageError}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label" for="mail">Adresse email</label>
                            <div class="control">
                                <input id="mail" class="input" type="email" v-model="email" v-on:keyup="verifyEmail">
                            </div>
                            <p class="help is-danger">{{emailMessageError}}</p>
                        </div>
                        <div class="field">
                            <label class="label" for="password">Mot de passe</label>
                            <div class="control">
                                <input id="password" class="input" type="password" v-model="password" v-on:keyup="verifyPassword">
                            </div>
                            <p class="help is-danger">{{passwordMessageError}}</p>
                        </div>
                        <div class="field">
                            <input class="is-checkradio" id="exampleCheckbox" type="checkbox" v-model="condition">
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
    import UserApi from "../../services/UserApi";

    export default {
        name: "Professional",
        data() {
            return {
                rubricItems: null,
                cityItems: null,
                civility: null,
                lastName: null,
                lastNameMessageError: null,
                lastNameGood: false,
                firstName: null,
                firstNameMessageError: null,
                firstNameGood: false,
                company: null,
                companyMessageError: null,
                companyGood: false,
                siret: null,
                siretMessageError: null,
                siretGood: false,
                rubric: null,
                rubricMessageError: null,
                rubricGood: false,
                address: null,
                addressMessageError: null,
                addressGood: false,
                city: null,
                cityMessageError: null,
                cityGood:false,
                telephone: null,
                telephoneMessageError: null,
                telephoneGood: false,
                email: null,
                emailMessageError: null,
                emailGood: false,
                password: null,
                passwordMessageError: null,
                passwordGood: false,
                condition: false,
                formValid: false,
            }
        },
        methods: {
            checkFormValid() {
                if(this.firstNameGood && this.lastNameGood &&
                    this.companyGood && this.siretGood && this.rubricGood && this.addressGood &&
                    this.cityGood && this.telephoneGood && this.emailGood && this.passwordGood &&
                    this.condition && this.civility == 1 || this.civility == 2)
                {
                    this.formValid = true
                } else {
                    this.formValid = false
                }
            },
            sendForm() {
              console.log('form good')
            },
            verifyLastName() {
                if(this.lastName.length < 2) {
                    this.lastNameMessageError = "Le Nom est trop court. Veuillez saisir au moins 2 caractères.\n"
                    this.lastNameGood = false
                } else {
                    this.lastNameMessageError = null
                    this.lastNameGood = true
                }
            },
            verifyFirstName() {
                if(this.firstName.length < 2) {
                    this.firstNameMessageError = "Le prénom est trop court. Veuillez saisir au moins 2 caractères.\n"
                    this.firstNameGood = false
                } else {
                    this.firstNameMessageError = null
                    this.firstNameGood = true
                }
            },
            verifyCompany() {
                if(this.company.length < 2) {
                    this.companyMessageError = "Le nom de votre société est trop court. Veuillez saisir au moins 2 caractères.\n"
                    this.companyGood = false
                } else {
                    this.companyMessageError = null
                    this.companyGood = true
                }
            },
            verifySiret() {
                if(!this.siretValid(this.siret)) {
                    this.siretMessageError = "Le numéro de Siret est incorrect. Il doit contenir 14 chiffres."
                    this.siretGood = false
                } else {
                    this.siretMessageError = null
                    this.siretGood = true
                }
            },
            verifyRubric() {
                if(this.rubric === null) {
                    this.rubricMessageError = "Veuillez sélectionner un secteur d'activité.\n"
                    this.rubricGood = false
                } else {
                    this.rubricMessageError = null
                    this.rubricGood = true
                }
            },
            verifyAddress() {
                if(this.address.length < 2) {
                    this.addressMessageError = "L’adresse de votre société est trop court. Veuillez saisir au moins 2 caractères.\n"
                    this.addressGood = false
                } else {
                    this.addressMessageError = null
                    this.addressGood = true
                }
            },
            verifyCity() {
                if(this.city.length < 1) {
                    this.cityMessageError = "Veuillez saisir une ville ou un code postal.\n"
                    this.cityGood = false
                    this.cityItems = null
                } else {
                    UserApi.getCites(this.city)
                    .then(response => {
                        this.cityItems = response.data
                        this.cityMessageError = null
                        if(response.data.length === 0) {
                            this.cityMessageError = "Aucune ville ne correspond a votre recherche"
                            this.cityItems = null
                            this.cityGood = false
                        }
                    })
                    .catch(error => {
                        alert(error.response)
                    })
                }
            },
            verifyNumber() {
                if(this.numberValid(this.telephone) === 1) {
                    this.telephoneMessageError = null
                    this.telephoneGood = true
                } else {
                    this.telephoneMessageError = "Votre numéro de téléphone doit comporter 10 chiffres, sans espace ni séparateur.\n"
                    this.telephoneGood = false
                }
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
            // function utilis
            numberValid(num) {
                var valide=/^0[1-7]\d{8}$/;
                if(valide.test(num)){
                    return 1;
                }
                else{
                    return 0;
                }
            },
            siretValid(siret) {
                let estValide;
                if ( (siret.length != 14) || (isNaN(siret)) )
                    estValide = false;
                else {
                    // Donc le SIRET est un numérique à 14 chiffres
                    // Les 9 premiers chiffres sont ceux du SIREN (ou RCS), les 4 suivants
                    // correspondent au numéro d'établissement
                    // et enfin le dernier chiffre est une clef de LUHN.
                    let somme = 0;
                    let tmp;
                    for (var cpt = 0; cpt<siret.length; cpt++) {
                        if ((cpt % 2) == 0) { // Les positions impaires : 1er, 3è, 5è, etc...
                            tmp = siret.charAt(cpt) * 2; // On le multiplie par 2
                            if (tmp > 9)
                                tmp -= 9;	// Si le résultat est supérieur à 9, on lui soustrait 9
                        }
                        else
                            tmp = siret.charAt(cpt);
                        somme += parseInt(tmp);
                    }
                    if ((somme % 10) == 0)
                        estValide = true; // Si la somme est un multiple de 10 alors le SIRET est valide
                    else
                        estValide = false;
                }
                return estValide;
            },
            selectCity(citySelected) {
                this.citySelected = citySelected
                this.city = this.citySelected
                this.cityItems = null
                this.cityGood = true
            },
            validEmail(email) {
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
        mounted() {
            UserApi.getRubric()
            .then(response => {
                this.rubricItems = response.data
            })
            .catch(error => {
                alert(error.response)
            })
        }
    }
</script>

<style lang="scss">
    .content-city {
        background-color: white;
        height: 110px;
        width: auto;
        overflow: scroll;
    }
    .list-city {
        margin-left: 10px;
    }
    .city {
        cursor: pointer;
    }
    .city:hover {
        background-color: #f4f6f7;
    }
</style>