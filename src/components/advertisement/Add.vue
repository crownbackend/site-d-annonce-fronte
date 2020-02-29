<template>
    <div>
       <h1 class="title is-1 container has-text-centered">
           Déposer une annonce
       </h1>
        <hr>
        <div class="container">
            <!-- Choices category -->
            <div v-if="choiceCategory">
                <h3 class="title is-4">Choisissez la catégorie</h3>
                <div class="field">
                    <label class="label" for="search"></label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" id="search" type="text" v-model="search" placeholder="Que proposez vous aujourd'hui ?">
                        <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                          </span>
                    </p>
                    <div class="notification" v-if="search">
                        <ul class="list-category content-category">
                            <li class="category" v-for="category in resultQuery" @click="selectCategory(category.type, category.name, category.sub_type)" v-bind:key="category.id">
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
                                    <div class="sub-category" @click="selectCategory(subcategory.type, subcategory.name, subcategory.subType)" :data-type="'category_type_'+subcategory.type" :data-sub-type="'category_sub_type_'+subcategory.subType">
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
                                    <div class="sub-category" @click="selectCategory(subcategory.type, subcategory.name, subcategory.subType)" :data-type="'category_type_'+subcategory.type" :data-sub-type="'category_sub_type_'+subcategory.subType">
                                        {{subcategory.name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Choices category -->

            <!-- Type category -->
            <div v-if="typeCategoryForm">
                <div class="row">
                    <div class="col-md-6">
                        <div @click="returnListCategory" class="category-selected title is-5">
                            {{categorySelected}}
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="field">
                            <span class="tag">Vous vendez</span>
                            <input class="is-checkradio is-rtl" id="offer" type="radio" v-model="type" value="1" name="type" checked="checked">
                            <label for="offer">Offre</label>
                            <input class="is-checkradio is-rtl" id="demand" type="radio" v-model="type" value="2" name="type">
                            <label for="demand">Demande</label>
                            <span class="tag">Vous recherchez</span>
                        </div>
                    </div>
                </div>
                <br>
                <button class="button is-primary" @click="afterSelectType" style="float: right">
                    Suivant
                </button>
            </div>
            <!-- Type category -->

            <div v-if="categoryAfterType">
                <!-- Form vehicle -->
                <div v-if="typeCategory == 2">
                    <div v-if="subTypeCategory == 1">
                        Voiture
                    </div>

                    <div v-if="subTypeCategory == 2">
                        Moto
                    </div>

                    <div v-if="subTypeCategory == 3">
                        Caravaning
                    </div>

                    <div v-if="subTypeCategory == 4">
                        Utilitaires
                    </div>

                    <div v-if="subTypeCategory == 5">
                        Nautisme
                    </div>
                </div>
                <!-- Form vehicle -->
            </div>

            <div v-if="adDemand">
                <form method="post">
                    <h3 class="title is-3">Décrivez votre demande !</h3>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="field">
                                <div class="control">
                                    <label for="title">Titre de l'annonce</label>
                                    <input class="input" type="text" id="title">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
    import CategoryApi from "../../services/CategoryApi";

    export default {
        name: "Add",
        data() {
            return {
                categories: [],
                show: "none",
                type: 1,
                categoriesSearch: null,
                search: null,
                typeCategory: null,
                subTypeCategory: null,
                choiceCategory: true,
                categorySelected: "",
                typeCategoryForm: null,
                categoryAfterType: false,
                adDemand: false,
                cursorType: "",
                disabledType: true
            }
        },
        mounted() {
            CategoryApi.getCategories()
            .then(response => {
                this.categories = response.data.categories
                this.categoriesSearch = response.data.searchResult

            })
            .catch(() => {
                alert('Erreur serveur')
            })

        },
        methods: {

            showSubCategory(id) {
                let sub_category = document.querySelector("#sub_category_"+id)
                if(sub_category.style.display === "block") {
                    sub_category.style.display = "none"
                } else {
                    sub_category.style.display = "block"
                }
            },

            selectCategory(type, nameCategory, subType) {
                this.choiceCategory = false
                this.categorySelected = nameCategory
                this.typeCategoryForm = true
                this.typeCategory = type
                this.subTypeCategory = subType
            },

            returnListCategory() {
                this.typeCategoryForm = false
                this.choiceCategory = true
                this.adDemand = false
                this.categoryAfterType = false
            },

            afterSelectType()
            {
                if(this.type == 2) {
                    this.adDemand = true
                    this.typeCategoryForm = false
                } else if(this.type == 1) {
                    this.categoryAfterType = true
                    this.adDemand = false
                    this.typeCategoryForm = false
                }
            }


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
        width: 50%;
        height: 50%;
        cursor: pointer;
    }
    .cursor-auto {
        cursor: auto;
    }
</style>