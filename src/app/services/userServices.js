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
    getRoles() {
        return this.$http.get(this.$conf.target + '/role/getRole')
            .then(resp => resp.data)
    }

    addRole(roleDo) {
        return this.$http.post(this.$conf.target + '/role/addRole', roleDo)
            .then(resp => resp.data)
    }

    editRole(roleDo) {
        return this.$http.post(this.$conf.target + '/role/updateRole', roleDo)
            .then(resp => resp.data)
    }

    delRole(roleDo) {
        return this.$http.post(this.$conf.target + '/role/deleteRole', roleDo)
            .then(resp => resp.data)
    }
    getPerm() {
        return this.$http.get(this.$conf.target + '/permission/getPerm')
            .then(resp => resp.data)
    }

    addPerm(PermDo) {
        return this.$http.post(this.$conf.target + '/permission/addPerm', PermDo)
            .then(resp => resp.data)
    }

    editPerm(PermDo) {
        return this.$http.post(this.$conf.target + '/permission/updatePerm', PermDo)
            .then(resp => resp.data)
    }

    delPerm(PermDo) {
        return this.$http.post(this.$conf.target + '/permission/deletePerm', PermDo)
            .then(resp => resp.data)
    }
}
export default new UserServices();