const RoutesInfo = require('@quoin/expressjs-routes-info');

const constants = require('./../lib/constants');
const search = require('./search');

module.exports = (baseUrl) => {
    const routesInfo = new RoutesInfo('/', baseUrl);

    routesInfo.route(constants.ROUTE_NAME, '/{?q,p}', search);

    return routesInfo;
};
