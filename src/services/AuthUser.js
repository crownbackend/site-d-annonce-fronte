import axios from "axios";
import Vue from "vue";

class AuthUser {
    verifyToken() {
        //this.token = token
        return axios.get(Vue.prototype.$hostName+"/check/login/verify/token")
    }

    infoUser() {
        return axios.get(Vue.prototype.$hostName+"/user/profile/information")
    }
}

export default new AuthUser;