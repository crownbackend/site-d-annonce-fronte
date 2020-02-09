<template>
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-7">
            <div class="map" id="map">
                <div class="map__image text-center">
                    <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 767 678" xml:space="preserve">
                    <g>
                        <router-link :to="{ name: 'indexAdvertisement', params: { region: region.slug }}" v-for="region in regions" v-bind:key="region.id">
                            <path :id="region.name" :title="region.name" :d="region.d"></path>
                        </router-link>
                    </g>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="100 0 900 850"  xml:space="preserve">
                        <g>
                            <router-link :to="{ name: 'indexAdvertisement', params: { region: department.slug }}" v-for="department in departments" v-bind:key="department.id">
                                <path :id="department.name" :title="department.name" :d="department.d" ></path>
                            </router-link>
                        </g>
                    </svg>
                </svg>
                </div>
            </div>
        </div>
</template>

<script>
    import RegionApi from "../../services/RegionApi";

    export default {
        name: "Map",
        data() {
            return {
                regions: [],
                departments: [],
            }
        },
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
        }
    }
</script>

<style>
    #map {
        height: 300px;
    }

    .map__image path {
        fill: #c2c2c2;
        stroke: #FFF;
        stroke-width: 1.5px;
        transition: fill 0.5s;
    }

    .map__image path:hover {
        fill: #00d1b2;
        cursor: pointer;
    }

    .map__image {
        width: 900px;
        height: auto;
    }

    @media screen and (min-width: 200px) and (max-width: 576px) {
        .map__image {
            width: 400px;
            height: auto;
        }

        .map {
            padding-top: 20px;
            margin-bottom: 20px;
        }

        #hide_region {
            display: none;
        }

        #select_region {
            padding-top: 100px;
            display: block;
        }
    }

    @media screen and (min-width: 576px) and (max-width: 768px) {
        .map__image {
            width: 600px;
            height: auto;
        }
        #hide_region {
            display: none;
        }

        #select_region {
            padding-top: 200px;
            display: block;
        }

    }
    @media screen and (min-width: 768px) and (max-width: 960px) {
        .map__image {
            width: 600px;
            height: auto;
            padding-left: 30px;
            padding-top: 70px;
        }
        #hide_region {
            display: none;
        }

        #select_region {
            padding-top: 250px;
            display: block;
        }
    }
    @media screen and (min-width: 960px) and (max-width: 1140px)  {
        .map__image {
            width: 800px;
            height: auto;
            padding-left: 0px;
            padding-top: 30px;
        }

        #hide_region {
            display: none;
        }

        #select_region {
            padding-top: 400px;
            display: block;
        }
    }

    @media screen and (min-width: 1140px) and (max-width: 1450px) {
        #hide_region {
            display: none;
        }
        #select_region {
            padding-top: 450px;
            display: block;
        }

        .map__image {
            padding-top: 30px;
        }
    }

    @media screen and (min-width: 1450px) {
        #select_region {
            display: none;
        }
        .map__image {
            width: 700px;
            height: auto;
        }
    }

</style>