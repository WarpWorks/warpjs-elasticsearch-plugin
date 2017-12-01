const constants = require('./constants');

let RoutesInfo;

module.exports = () => {
    // Avoid cyclic
    if (!RoutesInfo) {
        RoutesInfo = require('@quoin/expressjs-routes-info');
    }
    return RoutesInfo.expand(constants.ROUTE_NAME, {});
};
