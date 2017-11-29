const RoutesInfo = require('@quoin/expressjs-routes-info');

const search = require('./search');

module.exports = (config, warpCore, Persistence, baseUrl) => {
    const routesInfo = new RoutesInfo('/', baseUrl);

    routesInfo.route('W2:plugin:search:search', '/', search);

    return routesInfo;
};
