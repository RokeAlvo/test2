// TODO добавить логику кнопок применить и очистить
(function(){
    Array.from(document.querySelectorAll('.datepicker')).forEach(elem => {
        elem.addEventListener('pickmeup-change', function (e) {
            elem.parentElement.parentElement
                .querySelector('.range-date-select__input-date-start')
                .querySelector('.input-date__input-field')
                .inputmask.setValue( e.detail.formatted_date[0]);
            elem.parentElement.parentElement
                .querySelector('.range-date-select__input-date-end')
                .querySelector('.input-date__input-field')
                .inputmask.setValue( e.detail.formatted_date[1]);
        })
    });
    Array.from(document.querySelectorAll('.range-date-select ')).forEach(elem => {
        elem.addEventListener('click', function (e) {
            if(e.target===elem.querySelector('.range-date-select__input-date-start').querySelector('.input-date__btn')) {
                elem.querySelector('.datepicker__wrap').classList.toggle('datepicker__wrap_hiden')
            }
        })
    });
}());
