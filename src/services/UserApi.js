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
        const formData = new FormData();
        formData.append('username', this.username)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('date', this.date)
        return axios.post(Vue.prototype.$hostName+"/register/user/particular", formData)
    }

    registrationProfessional(civility, firstName, lastName,
                             company, siret, rubric, address,
                             city, telephone, email, password) {
        this.civility = civility
        this.firstName = firstName
        this.lastName = lastName
        this.company = company
        this.siret = siret
        this.rubric = rubric
        this.address = address
        this.city = city
        this.telephone = telephone
        this.email = email
        this.password = password

        const formData = new FormData();
        formData.append("civility", civility)
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)
        formData.append("company", company)
        formData.append("siret", siret)
        formData.append("rubric", rubric)
        formData.append("address", address)
        formData.append("city", city)
        formData.append("telephone", telephone)
        formData.append("email", email)
        formData.append("password", password)

        return axios.post(Vue.prototype.$hostName+"/register/user/professional", formData)
    }
}

export default new UserApi;