import './main.scss';
import './includes/importJs'

const jquery = require("jquery");
const pgwSlider = require("pgwSlider");
window.$ = window.jQuery = jquery; 
require("jquery-ui");
$(document).ready(function() {
    $('.pgwSlider').pgwSlider({displayList: false, intervalDuration: 2000, transitionDuration: 1000});
});
