import Vue from 'vue'

class UserServices extends Vue {
    constructor() {
        super();
    }

    getUsers() {
        return this.$http.get(this.$conf.target + '/user/getUsers')
            .then(resp => resp.data);
    }
}
export default new UserServices();