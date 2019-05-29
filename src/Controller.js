class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

    view.on('heder.clickButtonRegistration', function(){alert('нажали кнопу регистрация')})
    view.on('header.clickButtonLogin', function(){alert('нажали кнопу логин')})
    view.on('formLogin.clickButtonLogin', function(){alert('нажали кнопу логин в форме войти')})
    view.on('formLogin.clickButtonRegistration', function(){alert('нажали кнопу создать')})
    }

}
export default Controller;
