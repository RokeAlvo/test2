'use stict'
class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(type, handler) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(handler);
        return this
    }

    emit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(cb => { cb(arg) })
        };
        return this;
    }
}

class View extends EventEmitter {
    constructor() {
        super();

        this.header = new Obj('header', ['standart', 'logged']);
        this.formSelect= new Obj('form-select-wrapper', ['hiden', '']);
        this.lp=new Obj('landing-page1', ['hiden', '']);
        this.filterPage=new Obj('filter-page', ['hiden', '']);
        this.main =
            {
                // formSelect: new Obj('form-select-wrapper', ['hiden', '']),
                formRegistration: new Obj('form-registration-wrapper', ['hiden', '']),
                formLogin: new Obj('form-login-wrapper', ['hiden', ''])
            }
            
        this.appEvent = new AppEvent();
        this.appEvent.add('heder.clickButtonRegistration', 'click', '.header__btn-registration button')
            .add('header.clickButtonLogin', 'click', '.header__btn-sign button')
            .add('formLogin.clickButtonLogin', 'click', '.form-login__submit button')
            .add('formLogin.clickButtonRegistration', 'click', '.form-login__sign-button button')
            .add('form-select__submit.clickButton', 'click', '.form-select__submit button')
            .add('header__logo.click', 'click', '.header__logo')

        this.addDomEvent();
    }

    addDomEvent() {
        document.addEventListener('click', e => {
            Array.from(this.appEvent.eventList).forEach(appEvent => {
                if (document.querySelector(appEvent.selector).contains(e.target)) {
                    this.emit(appEvent.name);
                    console.log('appEvent.name :', appEvent.name);
                }
            });
        });
    }


    runScript(script){
        script.forEach( (instruction)=>{
            instruction.fn(...instruction.args)
        });
    }

}

class Obj {
    constructor(selector, viewes = []) {
        this.selector = selector;
        this.html = document.querySelector(`.${selector}`);
        this.viewes = viewes;
        this.toggleView = (view)=> {
            if (!this.viewes.some(elem => view === elem) || view == undefined) {
                return Error;
            }
            else {
                this.viewes.forEach(item => {
                    if (item === '') {
                        if (item !== view) { this.html.classList.remove(`${this.selector}_${item}`) };
                    } else {
                        item === view ? this.html.classList.add(`${this.selector}_${item}`)
                            : this.html.classList.remove(`${this.selector}_${item}`);
                    }
                });
            }
            return this
        }
    
    }
}




class AppEvent {
    constructor() {
        this.listenEventsType = {};
        this.eventList = [];
    }

    add(name, type, selector) {
        if (this.eventList.some(item => { item[name] === name })) {
            console.log('!!!Такое событие существует')
        }
        else {
            let a = new ListenEventsElement(name, type, selector);
            this.eventList.push(a);
            // if (!this.listenEventsType[type]) { listenEventsType[type] = type };
        }
        return this
    }
}

class ListenEventsElement {
    constructor(name, type, selector) {
        this.name = name;
        this.type = type;
        this.selector = selector;
    }
}

export default View;
