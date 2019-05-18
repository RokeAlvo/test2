import './main.scss';
import './includes/importJs'

const jquery = require("jquery");
window.$ = window.jQuery = jquery; // notice the definition of global variables here
require("jquery-ui");
