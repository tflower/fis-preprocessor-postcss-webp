

var postcss = require('postcss');
var webptrans = require('./src/webptran');
module.exports = function (content, file, settings){
    return postcss(webptrans({
        fileDirname:file.dirname
    })).process(content).css;
}