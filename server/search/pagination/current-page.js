const RoutesInfo = require('@quoin/expressjs-routes-info');
const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./../../../lib/constants');

module.exports = (q, p, chunks) => {
    const href = RoutesInfo.expand(constants.ROUTE_NAME, {
        q,
        p
    });

    return warpjsUtils.createResource(href, {
        isPageNumber: true,
        isCurrent: true,
        page: p
    });
};
