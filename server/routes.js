const RoutesInfo = require('@quoin/expressjs-routes-info');

module.exports = (config, warpCore, Persistence, baseUrl) => {
    const routesInfo = new RoutesInfo('/', baseUrl);

    return routesInfo;
};
