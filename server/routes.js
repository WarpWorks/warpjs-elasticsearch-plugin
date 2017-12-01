const RoutesInfo = require('@quoin/expressjs-routes-info');

const search = require('./search');

module.exports = (baseUrl) => {
    const routesInfo = new RoutesInfo('/', baseUrl);

    routesInfo.route('W2:plugin:search:search', '/{?q,p}', search);

    return routesInfo;
};
