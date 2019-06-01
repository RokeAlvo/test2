import { userInfo } from "os";

class Model {
    constructor() {
        this.userBase = [];
    }

    addUser(user) {
        if (this.getUserFromBase(user.login) === null) {this._addUserToBase(user)}
        return this
    }

    _addUserToBase(user){
        this.userBase.push(user)
    }
    getUserFromBase(userName) {
        let result = this.userBase.filter(user => {
            return user.login === userName
        });
        if (result.length > 0) {
            return this._getUser(result[0].login, result[0].id, result[0].pasword)
        }
        else {
            return null
        };
    }

    // интерфейс к базе
    _getUser(login, id, pasword){
        let user={}
        user.login = login;
        user.id=id;
        user.pasword=pasword;
        return user
    }
}

export default Model;