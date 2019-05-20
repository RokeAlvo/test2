import pickmeup from './../../pickmeup/pickmeup.js';
import Inputmask from "inputmask";
addEventListener('DOMContentLoaded', function () {
    pickmeup.defaults.locales['ru'] = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };
    Array.from(document.querySelectorAll('.datepicker')).forEach(elem => {
        if(elem.parentElement.classList.contains('range-date-select_sinle')){
            pickmeup(elem, {
                flat : true,
                locale: "ru",
                prev: 'arrow_back',
                next: 'arrow_forward'
            });
        } else {
            pickmeup(elem, {
                flat : true,
                locale: "ru",
                mode: 'range',
                prev: 'arrow_back',
                next: 'arrow_forward'
            });
        }
    });
})