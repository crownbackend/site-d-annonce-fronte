<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-3">
                <div class="buttons">
                    <button class="button is-fullwidth is-primary">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        Déposer une annonce
                    </button>
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

                        <li>
                            <a href="">region</a>
                        </li>

                        <li>
                            <a href="">hello</a>
                        </li><li>
                        <a href="">region</a>
                    </li>

                        <li>
                            <a href="">hello</a>
                        </li><li>
                        <a href="">region</a>
                    </li>

                        <li>
                            <a href="">hello</a>
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
    export default {
        name: "MainMap",
        components: {Map}
    }
</script>

<style>

</style>