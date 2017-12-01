let RoutesInfo;

module.exports = () => {
    // Avoid cyclic
    if (!RoutesInfo) {
        RoutesInfo = require('@quoin/expressjs-routes-info');
    }
    return RoutesInfo.expand('W2:plugin:search:search', {});
};
