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
                    <ul style="list-style: none;">
                        <li v-for="region in regions" v-bind:key="region.id">
                            <router-link :to="{ name: 'indexAdvertisement', params: { region: region.slug }}">{{region.name}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div id="select_region">
            <div class="select is-medium">
                <select>
                    <option>CHOISIR</option>
                    <option>Select dropdown</option>
                    <option>With options</option>
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
              regions: []
          }
        },
        components: {Map},
        mounted() {
            RegionApi.getRegion()
            .then(response => {
                console.log(response)
                this.regions = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },
    }
</script>

<style>

</style>