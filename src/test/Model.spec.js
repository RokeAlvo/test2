import Model from './../model.js';

describe('тесты модели', () => {
    class Controller {
        constructor(model, view) {
            this.model = model;
            this.view = null
        }
    }

    class User {
        constructor(login, userId, pasword) {
            this.login = login,
                this.id = userId,
                this.pasword = pasword
        }
    }

    const model = new Model;
    const controller = new Controller(model, null);
    const user = new User('Вася', 289848, '12345');
    model.addUser(user);
    model.addUser({login: 'Лена', id: 25474, pasword: '098'});

    // let state = new State();
    // let a=state.addState('header', 'header_reg');
    // it('проверяем jest', () => {
    //     expect(1).toBe(2)
    // });

    it('подключение модели к контроллеру', () => {

        expect('model' in controller).toBe(true);
    });

    it('добавление нового юзера', () => {

        expect(model.userBase[0].login).toBe('Вася')
        expect(model.userBase[1].id).toBe(25474)
        expect(model.userBase[0].pasword).toBe('12345')
    });

    it('получение юзера из базы по логину', () => {
        expect(model.getUserFromBase('Лена').id).toBe(25474)
    });
    it('добавление юзера с таким же именем', () => {
        model.addUser({login: 'Лена', id: 444, pasword: '11sd'})
        expect(model.userBase.length).toBe(2)
    });

});