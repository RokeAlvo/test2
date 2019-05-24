"use strict";
console.log("скрипт сборки");


/// 
const parcel = require ('parcel-bundler');

const fs = require('fs');
const path = require('path');
const { series, parallel, src, dest, watch, lastRun } = require('gulp');
const config = {
  'dir': {
    'src': 'src/',
    'build': 'build/',
    'blocks': 'src/blocks/'
  },
  'bemModSeparator': '_',
  'defaultExtensions': ['scss'],
};
const dir = config.dir;
const bemModSeparator = config.bemModSeparator;
let doNotEditMsg = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';




function writePugMixinsFile(cb) {
  let allBlocksWithPugFiles = getDirectories('pug');
  let pugMixins = '//-' + doNotEditMsg.replace(/\n /gm, '\n  ');
  allBlocksWithPugFiles.forEach(function (blockName) {
    pugMixins += `include ../blocks/${blockName}\n`;
  });
  fs.writeFileSync(`${dir.src}includes/mixins.pug`, pugMixins);
  cb();
}
exports.writePugMixinsFile = writePugMixinsFile;



function writeJsImport(cb) {
  let allBlocksWithPugFiles = getDirectories('js');
  let JsImport = '';
  allBlocksWithPugFiles.forEach(function (blockName) {
    JsImport += `import "../blocks/${blockName}";\n`;
  });
  fs.writeFileSync(`${dir.src}includes/importJs.js`, JsImport);
  cb();
}
exports.writeJsImport = writeJsImport;


function writeScssImport(cb) {
  let allBlocksWithPugFiles = getDirectories('scss');
  let pugMixins = '';
  allBlocksWithPugFiles.forEach(function (blockName) {
    pugMixins += `@import "../blocks/${blockName}";\n`;
  });
  fs.writeFileSync(`${dir.src}includes/includeScss.scss`, pugMixins);
  cb();
}
exports.writeScssImport = writeScssImport;

function runParcel(){
  return src ( 'src/*.pug', {read:false})
    .pipe( parcel({outDir: 'dist', publicURL: './'}, {source: 'build'}))
    .pipe (dest('dist'))
}
exports.runParcel = runParcel;


//функции не являющиеся частью glup
function getDirectories(ext) {

  var searchRecursive = function (dir, pattern) {
    // This is where we store pattern matches of all files inside the directory
    var results = [];

    // Read contents of directory
    fs.readdirSync(dir).forEach(function (dirInner) {
      // Obtain absolute path
      dirInner = path.resolve(dir, dirInner);

      // Get stats to determine if path is a directory or a file
      var stat = fs.statSync(dirInner);

      // If path is a directory, scan it and combine results
      if (stat.isDirectory()) {
        results = results.concat(searchRecursive(dirInner, pattern));
      }

      // If path is a file and ends with pattern then push it onto results
      if (stat.isFile() && dirInner.endsWith(pattern)) {
        results.push(dirInner);
      }
    });
    return results;
  };

  let files = searchRecursive(dir.blocks, "." + ext);
  let item2 = [];
  files.forEach(function (item, i) {
    item2.push(path.relative(dir.blocks, item).replace(/\\/g, '/'))
  });

  return sortStyle(item2);

}

//  сортировка стилей по уровню вложенности
function sortStyle(inArr) {
  let outArr = []; // отсортированые строки

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
  });
  return outArr;
};


exports.default = parallel(writePugMixinsFile, writeJsImport, writeScssImport);
exports.run = series(parallel(writePugMixinsFile, writeJsImport, writeScssImport), runParcel);

