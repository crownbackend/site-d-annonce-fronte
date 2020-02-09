<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-3">
                <div class="buttons">
                    <router-link :to="{name: 'addAdvertisement'}" class="button is-fullwidth is-primary">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        Déposer une annonce
                    </router-link>
                </div>
                <div class="buttons">
                    <button class="button is-fullwidth is-valid">
                        <i class="fa fa-crosshairs" aria-hidden="true"></i>
                        Rechercher autour de moi
                    </button>
                </div>
            </div>
            <Map/>
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-2">
                <div class="pull-right" style="padding-top: 30px;" id="hide_region">
                    <ul class="regions-list">
                        <li v-for="region in regions" v-bind:key="region.id" class="region-item">
                            <router-link :to="{ name: 'indexAdvertisement', params: { region: region.slug }}">{{region.name}}</router-link>
                        </li>
                        <br>
                        <li v-for="department in departments" v-bind:key="department.id" class="region-item">
                            <router-link :to="{ name: 'indexAdvertisement', params: { region: department.slug }}">{{department.name}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div id="select_region">
            <div class="select is-fullwidth">
                <select v-on:change="changeRegion">
                    <option>Choisissez une région</option>
                    <option :value="region.id" :data-region="region.slug" v-for="region in regions" v-bind:key="region.id">
                        {{region.name}}
                    </option>
                    <option :value="department.id" :data-region="department.slug" v-for="department in departments" v-bind:key="department.id">
                        {{department.name}}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    import Map from "./Map";
    import RegionApi from "../../services/RegionApi";
    export default {
        name: "MainMap",
        data() {
          return {
              regions: [],
              departments: [],
          }
        },
        components: {Map},
        mounted() {
            RegionApi.getRegion()
            .then(response => {
                this.regions = response.data.regions
                this.departments = response.data.departments
                this.regions.splice(-1, 1)
                this.departments.splice(-2, 2)
            })
            .catch(() => {
                alert("problème serveur veuillez réssayer plus tard")
            })
        },
        methods: {
            changeRegion(event) {
                let data = document.querySelector('[value="'+event.target.value+'"]')
                let region = data.getAttribute("data-region")
                this.$router.push({path:'/annonces/offres/' + region })
            }
        }
    }
</script>

<style>
    .regions-list {
        list-style: none;
    }
    .region-item {
        width: 150%;
    }
</style>