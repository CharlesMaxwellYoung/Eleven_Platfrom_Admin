class ValidateServices {
    userLoginNameValidate(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入用户名'));
        } else {
            callback();
        }
    }

    userPasswordValidate(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            callback();
        }
    }
}

export default new ValidateServices();