const exec = require('child_process').exec;

let util = {
    webper(settings, fileSrc, dest) {
        let args = ['-quiet', '-mt'];

        if (settings.preset) {
            args.push('-preset', settings.preset);
        }

        if (settings.quality) {
            args.push('-q', settings.quality);
        }

        if (settings.alphaQuality) {
            args.push('-alpha_q', settings.alphaQuality);
        }

        if (settings.method) {
            args.push('-m', settings.method);
        }

        if (settings.size) {
            args.push('-size', settings.size);
        }

        if (settings.sns) {
            args.push('-sns', settings.sns);
        }

        if (settings.filter) {
            args.push('-f', settings.filter);
        }

        if (settings.autoFilter) {
            args.push('-af');
        }

        if (settings.sharpness) {
            args.push('-sharpness', settings.sharpness);
        }

        if (settings.lossless) {
            args.push('-lossless');
        }
        let comd = 'cwebp ' + args.concat([fileSrc, '-o', dest]).join(' ');
        return new Promise((resolve, rejects) => {
            exec(comd, function (err) {
                if (err) {
                    rejects(err);
                } else {
                    resolve(comd);
                }

            });
        })

    },
    excluded(src) {
        //fis inline/sprite文件不处理  
        //如果有特殊不想处理的，加?__nowebp
        if (src.indexOf('?__inline') > -1 || src.indexOf('?__sprite') > -1 || src.indexOf('?__nowebp') > -1) {
            return true;
        }
        //除了png/jpg之外的不处理
        if (src.indexOf('.png') == -1 && src.indexOf('.jpg') == -1) {
            return true;
        }
        //采用绝对路径的不处理
        if (src.indexOf('//') > -1) {
            return true;
        }
        return false;
    }

}

module.exports = util;