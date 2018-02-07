import Vue from 'vue'

class UserApi extends Vue {
    constructor() {
        super();
    }
    goLogin(usersModel) {
        return this.$http.post(this.$conf.target + `/user/userLogin`, usersModel)
            .then(resp => resp.data);
    }

    getNormalInfo() {
        return this.$http.get(this.$conf.target + '/user/userNormalInfo')
            .then(resp => resp.data);
    }

    userLoginOut() {
        return this.$http.get(this.$conf.target + '/user/userLoginOut')
            .then(resp => resp.data);
    }

}
export default new UserApi();