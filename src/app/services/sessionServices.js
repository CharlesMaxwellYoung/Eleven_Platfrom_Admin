import * as crypto from 'crypto-js'
import * as _ from 'lodash'

class SessionService {
    constructor() {
        this.tobeLocalSavedJson = {};
        this.tobeSessionSavedJson = {};
        this.timeoutId = null;
    }

    /**
        * 得到session的值
        * @param {string} key
        * @returns {any}
        */
    get(key) {
        let storgeItem = '';
        console.debug('begin get(),key is %s', key);
        let valueStr = sessionStorage.getItem(key) || localStorage.getItem(key);
        if (valueStr) {
            storgeItem = JSON.parse(crypto.AES.decrypt(valueStr, key)
                .toString(crypto.enc.Utf8));
        }
        return storgeItem;
    }

    /**
     * 添加session
     *
     * @param {string} key
     * @param value
     * @param {boolean} isPersistence
     */
    put(key, value, isPersistence) {
        isPersistence = isPersistence || false;
        if (_.isNull(value) || _.isUndefined(value) || _.isNaN(value)) {
            this.remove(key);
            return;
        }
        if (isPersistence) {
            this.tobeLocalSavedJson[key] = value;
        } else {
            this.tobeSessionSavedJson[key] = value;
        }
        try {
            this._delaySave();
        } catch (e) {
            console.error(`localStorage access denied!`);
        }
    }

    /**
     * 清除所有session
     * @param {boolean} isAlsoClearPersistent
     */
    clear(isAlsoClearPersistent) {
        try {
            sessionStorage.clear();
        } catch (e) {
            console.error(`localStorage access denied!`);
        }
        if (isAlsoClearPersistent) {
            try {
                localStorage.clear();
            } catch (e) {
                console.error(`localStorage access denied!`);
            }
        }
        this.tobeLocalSavedJson = {};
        this.tobeSessionSavedJson = {};
    }

    /**
     * 移除对应key的session
     * @param {string} key
     */
    remove(key) {
        delete this.tobeSessionSavedJson[key];
        delete this.tobeLocalSavedJson[key];

        try {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`localStorage access denied!`);
        }
    }

    _delaySave() {
        this.saveToStorge(this.tobeLocalSavedJson, localStorage);
        this.saveToStorge(this.tobeSessionSavedJson, sessionStorage);
        this.tobeLocalSavedJson = {};
        this.tobeSessionSavedJson = {};
    }

    saveToStorge(json, storge) {
        _.each(json, (value, key) => {
            let encryptValue = crypto.AES.encrypt(JSON.stringify(value), key);
            try {
                storge.setItem(key, encryptValue);
            } catch (e) {
                console.error(`localStorage access denied!`);
            }
        });

    }
}

export default new SessionService();