const warpjsUtils = require('@warp-works/warpjs-utils');

module.exports = (q, p, chunks) => {
    if (p > 2) {
        return warpjsUtils.createResource('', {
            disabled: true,
            isEllipsis: true
        });
    }
};
