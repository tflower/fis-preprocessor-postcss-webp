

var postcss = require('postcss');
var webptrans = require('webptran.js');
module.exports = function (content, file, settings){
    return postcss(webptrans({
        fileDirname:file.dirname
    })).process(content).css;
}