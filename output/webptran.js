const postcss = require('postcss');

const path = require('path');
const fs = require('fs');
const util = require('util.js');
module.exports = postcss.plugin('webptran', function (options) {
    let opt = options || {};
    let _root = opt.fileDirname;
    let html = '';
    return (root, result) => {
        root.walkDecls(/^background/, decl => {
            console.log(decl.parent.selector)
            if (decl.parent.parent == decl.root()) {
                decl.value.replace(/url\(([\S]+)\)/g, function (str, src) {

                    let fullsrc = path.join(_root,src);
                    let destsrc = fullsrc + '.webp';
                    util.webper({}, fullsrc, destsrc).then(() => {

                        if (decl.value.indexOf('url') > -1) {
                            let selector = '\x0a.webps ' + decl.parent.selector;
                            let value = decl.prop + ':' + decl.value.replace(/(\.png|\.jpg)/g, '$1.webp')
                            html += `${selector}{${value}};`;
                        }
                    }).catch((err) => {
                        console.log(err)
                    })

                })
            }



        });

        // root.walk(node => {
        //     // console.log(decl.parent.selector)
        //     // console.log(decl.value)
        //     fs.appendFile('ast.json', JSON.stringify(node), (err) => {
        //       if (err) throw err;
        //       console.log('The "data to append" was appended to file!');
        //     });

        //   });
        root.append(html);

    };
});