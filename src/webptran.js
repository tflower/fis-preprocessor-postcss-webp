const postcss = require('postcss');

const path = require('path');
const fs = require('fs');
const util = require('./util');
module.exports = postcss.plugin('webptran', function (options) {
    let opt = options || {};
    let _root = opt.fileDirname;
    let html = '';
    return (root, result) => {
        root.walkDecls(/^background/, decl => {
            if (decl.parent.parent == decl.root()) {
                decl.value.replace(/url\(['"]?([\s\S]+?)['"]?\)/g, function (str, src) {
                    if(util.excluded(src)){
                        return;
                    }
                    let fullsrc = path.join(_root, src);
                    let destsrc = fullsrc + '.webp';
                    util.webper({}, fullsrc, destsrc).then((success) => {
                        console.log('success:' + success)
                    }).catch((err) => {
                        console.log(err)
                    })

                    let selector = '\x0a.webps ' + decl.parent.selector;
                        let value = decl.prop + ':' + decl.value.replace(/(\.png|\.jpg)/g, '$1.webp')
                        html += `${selector}{${value}};`;
                        console.log(html)
                        

                })
            }
        });
        root.append(html);

    };
});