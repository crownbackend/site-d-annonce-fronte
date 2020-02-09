<template>
    <div>
       <h1 class="title is-1">
           Déposer une annonce
       </h1>
        <div class="container">
            <div class="notification">
              <div class="container">
                  <h3 class="title is-4">Choisissez la catégorie</h3>
                  <div class="row">
                      <div class="col-md-6">
                          <div v-for="categorie in categories.slice(0, 5)" v-bind:key="categorie.id">
                              <div class="category" @click="showSubCategory(categorie.id, $event)">
                                  {{categorie.name}}
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
                      <div class="col-md-6">
                          <div v-for="categorie in categories.slice(5)" v-bind:key="categorie.id">
                              <div class="category" @click="showSubCategory(categorie.id)">
                                  {{categorie.name}}
                                  <div :id="'sub_category_'+categorie.id">
                                      <div v-for="subcategory in categorie.children" v-bind:key="subcategory.id">
                                          <div class="sub-category">
                                              {{subcategory.name}}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
<!--    <ul v-for="subcategory in categorie.children" v-bind:key="subcategory.id">-->
<!--        <li>-->
<!--            {{subcategory.name}}-->
<!--        </li>-->
<!--    </ul>-->
</template>

<script>
    import CategoryApi from "../../services/CategoryApi";

    export default {
        name: "Add",
        data() {
            return {
                categories: [],
                show: "none"
            }
        },
        mounted() {
            CategoryApi.getCategories()
            .then(response => {
                this.categories = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        methods: {
            showSubCategory(id, event) {
                console.log(id)
                if(event.currentTarget.children[0].style.display === "block") {
                    event.currentTarget.children[0].style.display = "none"
                } else {
                    event.currentTarget.children[0].style.display = "block"
                }
            }
        }
    }
</script>

<style>
    .sub-category {
        padding-left: 20px;
    }
    .category {
        cursor: pointer;
    }
</style>