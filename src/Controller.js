class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.scripts = {}

        view.on('heder.clickButtonRegistration', () => { this.view.runScript(this.scripts.registration) });
        view.on('header.clickButtonLogin', () => { this.view.runScript(this.scripts.login) });
        view.on('formLogin.clickButtonLogin', () => { alert('нажали кнопу логин в форме войти') });
        view.on('formLogin.clickButtonRegistration', () => { this.view.runScript(this.scripts.registration) });
        view.on('form-select__submit.clickButton', () => { this.view.runScript(this.scripts.selectRoom) });
        view.on('header__logo.click', () => { this.view.runScript(this.scripts.initialization) });

// сценарии обработки событий TODO вынести в отдельный файл
        this.scripts.initialization = [
            { fn: this.view.header.toggleView, args: ['standart'] },
            { fn: this.view.formSelect.toggleView, args: [''] },
            this.addInstruction(this.view.main.formRegistration.toggleView, ['hiden']),
            this.addInstruction(this.view.main.formLogin.toggleView, ['hiden']),
            { fn: this.view.filterPage.toggleView, args: ['hiden'] },
            { fn: this.view.lp.toggleView, args: [''] },

        ];
        this.scripts.registration = [
            { fn: this.view.header.toggleView, args: ['standart'] },
            { fn: this.view.formSelect.toggleView, args: ['hiden'] },
            this.addInstruction(this.view.main.formRegistration.toggleView, ['']),
            this.addInstruction(this.view.main.formLogin.toggleView, ['hiden']),
        ];
        this.scripts.login = [
            { fn: this.view.header.toggleView, args: ['standart'] },
            { fn: this.view.formSelect.toggleView, args: ['hiden'] },
            this.addInstruction(this.view.main.formRegistration.toggleView, ['hiden']),
            this.addInstruction(this.view.main.formLogin.toggleView, ['']),
        ];
        this.scripts.selectRoom = [
            { fn: this.view.filterPage.toggleView, args: [''] },
            { fn: this.view.lp.toggleView, args: ['hiden'] },
        ];
        this.view.runScript(this.scripts.initialization);
        // this.view.header.toggleView("standart")
    }

    addScript(scriptName, script) {
        this.scripts[scriptName] = script;
        return this;
    }

    addInstruction(func, args, cntx) {
        return { fn: func, args: args, cntx: cntx }
    }


}

class Instruction {
    constructor(func, args) {
        this.fn = func,
            this.args = args
    }
}
export default Controller;
