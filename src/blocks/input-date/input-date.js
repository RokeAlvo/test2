import Inputmask from "inputmask";

// $(":input").inputmask();
(function () {
    Inputmask("datetime", {
        inputFormat: "dd.mm.yyyy", 
        "placeholder": "ДД.ММ.ГГГГ", 
        clearMaskOnLostFocus: false })
                                    .mask(document.querySelectorAll(".input-date__input-field"));
}());
