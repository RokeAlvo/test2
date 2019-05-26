import './main.scss';

const jquery = require("jquery");
const pgwSlider = require("pgwSlider");
window.$ = window.jQuery = jquery; 
require("jquery-ui");

import './includes/importJs'

$(document).ready(function() {
    $('.pgwSlider').pgwSlider({displayList: false, intervalDuration: 3000, transitionDuration: 3000});
     // FIXME поправить единицы изменения в pgwSlider: если меняются размеры вюпорта после запуска страницы, скрипту пофиг.
});
