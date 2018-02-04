import Vue from 'vue'

class UserServices extends Vue {
    constructor() {
        super();
    }

    getUsers() {
        return this.$http.get(this.$conf.target + '/user/getUser')
            .then(resp => resp.data)
    }

    addUser(userDo) {
        return this.$http.post(this.$conf.target + '/user/addUser', userDo)
            .then(resp => resp.data)
    }
    editUser(userDo) {
        return this.$http.post(this.$conf.target + '/user/updateUser', userDo)
            .then(resp => resp.data)
    }
    delUser(userDo) {
        return this.$http.post(this.$conf.target + '/user/deleteUser', userDo)
            .then(resp => resp.data)
    }
}
export default new UserServices();