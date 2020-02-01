import axios from "axios";
import Vue from "vue";

class UserApi {
    getCites(city) {
        this.city = city
        const formData = new FormData()
        formData.append("city", city)
        formData.append("zipCode", city)
        return axios.post(Vue.prototype.$hostName+"/all/city", formData)
    }

    getRubric() {
        return axios.get(Vue.prototype.$hostName+"/rubric/list/professional")
    }

    verifyEmail(email) {
        this.email = email;
        return axios.post(Vue.prototype.$hostName+"/register/user/verify/email", {
            email: email
        })
    }

    verifyUsername(username) {
        this.username = username
        return axios.post(Vue.prototype.$hostName+"/register/user/verify/username", {
            username: username
        })
    }

    registerParticular(username, email, password, date) {
        this.username = username
        this.email = email
        this.password = password
        this.date = date
        const userParticular = new FormData();
        userParticular.append('username', this.username)
        userParticular.append('email', this.email)
        userParticular.append('password', this.password)
        userParticular.append('date', this.date)
        userParticular.append('particular', "1")
        return axios.post(Vue.prototype.$hostName+"/register/user/particular", userParticular)
    }
}

export default new UserApi;