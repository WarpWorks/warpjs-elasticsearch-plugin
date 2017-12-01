const warpjsUtils = require('@warp-works/warpjs-utils');

module.exports = (q, p, chunks) => {
    if (p < (chunks - 1)) {
        return warpjsUtils.createResource('', {
            disabled: true,
            isEllipsis: true
        });
    }
};
