const RoutesInfo = require('@quoin/expressjs-routes-info');
const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./../../../lib/constants');

module.exports = (q, p, chunks) => {
    if (p > 1) {
        const href = RoutesInfo.expand(constants.ROUTE_NAME, {
            q,
            p: p - 1
        });
        return warpjsUtils.createResource(href, {
            isPageNumber: true,
            page: p - 1
        });
    }
};
