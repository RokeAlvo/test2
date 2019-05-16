(function sortStyle (inArr) {
    let outArr = []; // отсортированые строки

    const inArr = ['button/_color/_purple/_purple.scss',
        'button/_color/_white/_white.scss',
        'button/_icon-link/_icon-link.scss',
        'button/button.scss',
        'content-select-button/content-select-button.scss',
        'cv-page/__page-header/__page-header.scss',
        'cv-page/__page-main/__page-main.scss',
        'cv-page/cv-page.scss',
        'dropdown/__button-block/__button-block.scss',
        'dropdown/__button-clear/__button-clear.scss',
        'dropdown/__button-down/__button-down.scss',
        'dropdown/__button-down/_droped/_droped.scss',
        'dropdown/__button-down/_undroped/_undroped.scss',
        'dropdown/__content-field/__content-field.scss',
        'dropdown/__content-field/_visible/_visible.scss',
        'dropdown/__content/__content.scss',
        'dropdown/__output-field-text/__output-field-text.scss',
        'dropdown/__output-field/__output-field.scss',
        'dropdown/__output-field/_form-hover/_form-hover.scss',
        'dropdown/__title/__title.scss',
        'dropdown/__wraper/__wraper.scss',
        'dropdown/dropdown.scss',
        'header/__btn-registration/__btn-registration.scss',
        'header/__btn-sign/__btn-sign.scss',
        'header/__btn/__btn.scss',
        'header/__logo/__logo.scss',
        'header/__margin-center/__margin-center.scss',
        'header/__margin-left/__margin-left.scss',
        'header/__margin-right/__margin-right.scss',
        'header/__nav/__nav.scss',
        'header/__rectangle/__rectangle.scss',
        'header/__user/__user.scss',
        'header/_logged/_logged.scss',
        'header/_standart/standart.scss',
        'header/header.scss',
        'input-text/__input/__input.scss',
        'input-text/__name/__name.scss',
        'input-text/input-text.scss',
        'item-arrow/item-arrow.scss',
        'logo/logo.scss',
        'main/main.scss',
        'navigation/__elem/__elem.scss',
        'navigation/__elem/_arrowed/_arrowed.scss',
        'navigation/__elem/_bold/_bold.scss',
        'navigation/navigation.scss',
        'text-field/text-field.scss'];
    var inObj = [];
    inArr.forEach(function (item) {
        let itemArr = item.split('/');
        let obj = { block: '', elem: '', mod: [], fileName: '' };
        for (var i = itemArr.length - 1; i > -1; i--) {
            if (itemArr[i].indexOf('.') > -1) { obj.fileName = item }
            else if (itemArr[i].indexOf('__') > -1) { obj.elem = itemArr[i] }
            else if (itemArr[i].indexOf('_') > -1) { obj.mod.push(itemArr[i]) }
            else { obj.block = itemArr[i] };
        }
        inObj.push(obj);
    });

    let temp = inObj[0].block;
    let inBlock = [];
    let blockArr = [];
    inBlock[0] = [];

    let i = 0;
    inObj.forEach(item => {
        if (item.block === temp) {
            inBlock[i].push(item);
            temp = item.block;
        }
        else {
            i = i + 1;
            inBlock[i] = [];
            inBlock[i].push(item);
            temp = item.block;
        }
    });

    // // на выходе получили [[{block1},...,{block1}],............, [{block999},...,{block999}]]
    // // дальше надо сделать сортировку внутри блока
    // // сорритруем получившийся массив
    // inBlock.sort((a, b) => {
    //     return a[0].block.localeCompare(b[0].block)
    // });
    // // внутри одинаковых блоков сортируем по елементу и внутри сортируем моды
    // inBlock.forEach(item => {
    //     item.forEach(elem => {
    //         elem.mod.sort();
    //     });
    //     item.sort((a, b) => {
    //         return a.elem.localeCompare(b.elem);
    //     });
    // });

    // склеиваем все обатно в строки
    inBlock.forEach(block => {
        block.forEach(elem => {
            if (elem.elem === '' && elem.mod.length === 0) {
                outArr.push(elem.fileName)
            }
        });
        block.forEach(elem => {
            if (elem.elem === '' && elem.mod.length !== 0) {
                    outArr.push(elem.fileName)
            }
        });
        block.forEach(elem => {
            if (elem.elem !== '' && elem.mod.length === 0) {
                outArr.push(elem.fileName);
            }
        });
        block.forEach(elem => {
            if (elem.elem !== '' && elem.mod.length !== 0) {
                    outArr.push(elem.fileName)
            }
        });


        // block.forEach(elem => {
        //     elem.mod.forEach(mod => {
        //         let temp = elem.block + ',' + elem.elem + ',' + mod + ',' + elem.fileName;
        //         temp = temp.replace(/,,/g, '/');
        //         temp = temp.replace(/,/g, '/');
        //         outArr.push(temp);
        //     });
        //     if (elem.mod.length === 0) {
        //         let temp = elem.block + ',' + elem.elem + ',' + elem.fileName;
        //         temp = temp.replace(/,,/g, '/');
        //         temp = temp.replace(/,/g, '/');
        //         outArr.push(temp);
        //     }
        // });
    });
    outArr.forEach(item => {
        console.log(item + '\n')
    })
}());
