class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.scripts = {}

        view.on('heder.clickButtonRegistration', () => { this.view.runScript(this.scripts.registration) });
        view.on('header.clickButtonLogin', () => { this.view.runScript(this.scripts.login) });
        view.on('formLogin.clickButtonLogin', () => { alert('нажали кнопу логин в форме войти') });
        view.on('formLogin.clickButtonRegistration', () => { this.view.runScript(this.scripts.registration) });

// сценарии обработки событий TODO вынести в отдельный файл
        this.scripts.initialization = [
            { fn: this.view.header.toggleView, args: ['standart'] },
            { fn: this.view.formSelect.toggleView, args: [''] },
            this.addInstruction(this.view.main.formRegistration.toggleView, ['hiden']),
            this.addInstruction(this.view.main.formLogin.toggleView, ['hiden']),
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
