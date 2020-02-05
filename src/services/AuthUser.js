import axios from "axios";
import Vue from "vue";

class AuthUser {

    verifyPassword(password, email) {
        this.password = password
        this.email = email
        let formData = new FormData();
        formData.append("password", password)
        formData.append("email", email)
        return axios.post(Vue.prototype.$hostName+"/verify/password/login", formData)

    }
}

export default new AuthUser;