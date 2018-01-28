import Vue from 'vue'

class UserApi extends Vue {
    constructor() {
        super();
    }
    goLogin(usersModel) {
        return this.$http.post(this.$conf.target + `/user/userLogin`, usersModel)
            .then(resp => resp.data);
    }
}
export default new UserApi();