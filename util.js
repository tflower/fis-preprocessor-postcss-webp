

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
        console.log(comd)
        return new Promise((resolve,rejects)=>{
            exec(comd, function (err) {
                if (err) {
                    rejects();
                }else{
                    resolve();
                }

            });
        })
        
    }

}

module.exports = util;