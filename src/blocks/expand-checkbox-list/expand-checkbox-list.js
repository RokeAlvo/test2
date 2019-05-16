/* global document */

// const ready = require('../../js/utils/documentReady.js');

// ready(function(){
//   
// });
(function expandCheckboxList (){
    let elemList = Array.from(document.querySelectorAll(".expand-checkbox-list"));
    elemList.forEach(elem=>{
        elem.querySelector('.expand-checkbox-list__text-field').addEventListener('click', event => {
            // поймали клик на поле меняем состояние контента и переворачиваем стрелку
            
            elem.querySelector('.expand-checkbox-list__content').classList.toggle('expand-checkbox-list__content_hiden');
            elem.querySelector('.button-down').classList.toggle('button-down_undroped');
            elem.querySelector('.button-down').classList.toggle('button-down_droped');
        })
    });
})();