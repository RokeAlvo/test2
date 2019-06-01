import './main.scss';

const jquery = require("jquery");
const pgwSlider = require("pgwSlider");
window.$ = window.jQuery = jquery;
require("jquery-ui");

import './includes/importJs'

$(document).ready(function () {
    $('.pgwSlider').pgwSlider({ displayList: false, intervalDuration: 3000, transitionDuration: 3000 });
    // FIXME поправить единицы изменения в pgwSlider: если меняются размеры вюпорта после запуска страницы, скрипту пофиг.
});
import View from './view.js'
import Controller from './Controller'
import  Model  from './model'
var view = new View();
var model = new Model();
var controller = new Controller(model, view);



