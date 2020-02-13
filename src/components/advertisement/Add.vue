<template>
    <div>
       <h1 class="title is-1 container has-text-centered">
           Déposer une annonce
       </h1>
        <hr>
        <div class="container">
            <div>
              <div class="">

                  <div class="steps" id="steps_advertisement">
                      <Step name="Catégorie"
                            number="1"
                            :isActive="isActive"
                            :success="success"
                            :completed="completed" />
                      <Step name="Type d'annonce"
                            number="2"
                            :isActive="isActive"
                            :success="success"
                            :completed="completed" />

                      <div class="step-item" id="step3">
                          <div class="step-marker">3</div>
                          <div class="step-details">
                              <p class="step-title">Dites-nous en plus</p>
                          </div>
                      </div>
                      <div class="step-item" id="step4">
                          <div class="step-marker">4</div>
                          <div class="step-details">
                              <p class="step-title">Décrivez votre bien !
                              </p>
                          </div>
                      </div>
                      <div class="step-item" id="step5">
                          <div class="step-marker">5</div>
                          <div class="step-details">
                              <p class="step-title">Quel est votre prix ?</p>
                          </div>
                      </div>
                      <div class="step-item" id="step6">
                          <div class="step-marker">6</div>
                          <div class="step-details">
                              <p class="step-title">Ajoutez des photos</p>
                          </div>
                      </div>
                      <div class="step-item" id="step7">
                          <div class="step-marker">7</div>
                          <div class="step-details">
                              <p class="step-title">Où se situe votre bien ?</p>
                          </div>
                      </div>
                      <div class="step-item" id="step8">
                          <div class="step-marker">8</div>
                          <div class="step-details">
                              <p class="step-title">Vos coordonnées</p>
                          </div>
                      </div>
                      <div class="steps-content">
                          <div id="content_step1" class="step-content is-active" >
                              <!-- Choices catgéorie -->
                              <h3 class="title is-4">Choisissez la catégorie</h3>
                              <div class="field">
                                  <label class="label" for="search">Nom d'utilisateur</label>
                                  <p class="control has-icons-left has-icons-right">
                                      <input class="input" id="search" type="text" v-model="search" placeholder="Que proposez vous aujourd'hui ?">
                                      <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                          </span>
                                  </p>
                                  <div class="notification" v-if="search">
                                      <ul class="list-category content-category">
                                          <li class="category" v-for="category in resultQuery" v-bind:key="category.id">
                                              {{category.name}}
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div v-for="categorie in categories.slice(0, 5)" v-bind:key="categorie.id">
                                          <div class="category" :id="'category_'+categorie.id" @click="showSubCategory(categorie.id)">
                                              {{categorie.name}}
                                              <i class="fas fa-chevron-down"></i>
                                          </div>
                                          <div :id="'sub_category_'+categorie.id" v-bind:style="{display: show}">
                                              <div v-for="subcategory in categorie.children" v-bind:key="subcategory.id">
                                                  <div class="sub-category">
                                                      {{subcategory.name}}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div v-for="categorie in categories.slice(5)" v-bind:key="categorie.id">
                                          <div class="category" @click="showSubCategory(categorie.id)">
                                              {{categorie.name}}
                                              <i class="fas fa-chevron-down"></i>
                                          </div>
                                          <div :id="'sub_category_'+categorie.id" v-bind:style="{display: show}">
                                              <div v-for="subcategory in categorie.children" v-bind:key="subcategory.id">
                                                  <div class="sub-category">
                                                      {{subcategory.name}}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <!-- Choices catgéorie -->
                          </div>
                          <div id="content_step2" class="step-content">
                              <div class="field is-horizontal">
                                  <div class="field-label is-normal">
                                      <label class="label">Firstname</label>
                                  </div>
                                  <div class="field-body">
                                      <div class="field">
                                          <div class="control">
                                              <input class="input" name="firstname" id="firstname" type="text" placeholder="Firstname" autofocus data-validate="require">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="field is-horizontal">
                                  <div class="field-label is-normal">
                                      <label class="label">Last name</label>
                                  </div>
                                  <div class="field-body">
                                      <div class="field">
                                          <div class="control has-icon has-icon-right">
                                              <input class="input" type="text" name="lastname" id="lastname" placeholder="Last name" data-validate="require">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="field is-horizontal">
                                  <div class="field-label is-normal">
                                      <label class="label">Email</label>
                                  </div>
                                  <div class="field-body">
                                      <div class="field">
                                          <div class="control has-icon has-icon-right">
                                              <input class="input" type="email" name="email" id="email" placeholder="Email" data-validate="require">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div id="content_step3" class="step-content">
                              <div class="field is-horizontal">
                                  <div class="field-label is-normal">
                                      <label class="label">Facebook account</label>
                                  </div>
                                  <div class="field-body">
                                      <div class="field">
                                          <div class="control">
                                              <input class="input" name="facebook" id="facebook" type="text" placeholder="Facebook account url" autofocus data-validate="require">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="field is-horizontal">
                                  <div class="field-label is-normal">
                                      <label class="label">Twitter account</label>
                                  </div>
                                  <div class="field-body">
                                      <div class="field">
                                          <div class="control">
                                              <input class="input" name="twitter" id="twitter" type="text" placeholder="Twitter account url" autofocus data-validate="require">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div id="content_step4" class="step-content">
                              <h1 class="title is-4">Your account is now created!</h1>
                          </div>
                          <div id="content_step5" class="step-content">
                              <h1 class="title is-4">Your account is now created!</h1>
                          </div>
                          <div id="content_step6" class="step-content">
                              <h1 class="title is-4">Your account is now created!</h1>
                          </div>
                          <div id="content_step7" class="step-content">
                              <h1 class="title is-4">Your account is now created!</h1>
                          </div>
                          <div id="content_step8" class="step-content">
                              <h1 class="title is-4">Your account is now created!</h1>
                          </div>
                      </div>
                      <div class="steps-actions">
                          <div class="steps-action">
                              <button data-nav="previous" class="button is-light" :disabled="!button">Précédent</button>
                          </div>
                          <div class="steps-action">
                              <button data-nav="next" class="button is-light" :disabled="!button">Suivant</button>
                          </div>
                      </div>
                  </div>


              </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import CategoryApi from "../../services/CategoryApi";
    import Step from "./steps/Step";

    export default {
        name: "Add",
        components: {Step},
        data() {
            return {
                categories: [],
                show: "none",
                categoriesSearch: null,
                search: null,
                resultCategory: [],
                button: false,
                isActive: "",
                success: "",
                completed: ""
            }
        },
        mounted() {
            CategoryApi.getCategories()
            .then(response => {
                this.categories = response.data.categories
                this.categoriesSearch = response.data.searchResult
            })
            .catch(err => {
                console.log(err)
            })

            this.isActive = "is-active"

        },
        methods: {

            firstStep() {

            },

            showSubCategory(id) {
                let sub_category = document.querySelector("#sub_category_"+id)
                if(sub_category.style.display === "block") {
                    sub_category.style.display = "none"
                } else {
                    sub_category.style.display = "block"
                }
            },
        },
        computed: {
            resultQuery() {
                if(this.search)  {
                    return this.categoriesSearch.filter((category) => {
                        return this.search.toLowerCase().split(' ').every(v => category.name.toLowerCase().includes(v))
                    })
                } else {
                    return ''
                }
            }
        },
    }
</script>

<style>
    .sub-category {
        padding-left: 20px;
        cursor: pointer;
        padding-bottom: 10px;
    }
    .sub-category:hover {
        color: #00d1b2;
    }
    .category {
        cursor: pointer;
        padding-bottom: 10px;
        padding-top: 10px;
    }
    .category:hover {
        color: #00d1b2;
    }
    .content-category {
        height: 200px;
        width: auto;
        overflow: scroll;
    }
    .category-selected {
        width: 100%;
        height: 50px;
        border: solid 2px #4a4a4a;
    }
</style>