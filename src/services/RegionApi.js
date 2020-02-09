import axios from "axios"
import Vue from "vue"


class RegionAPi {
    getRegion() {
        return axios.get(Vue.prototype.$hostName+"/regions")
    }
}

export default new RegionAPi;