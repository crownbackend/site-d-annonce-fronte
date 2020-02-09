import Vue from "vue";
import axios from "axios"

class CategoryApi {
    getCategories() {
        return axios.get(Vue.prototype.$hostName+"/categories");
    }
}

export default new CategoryApi;