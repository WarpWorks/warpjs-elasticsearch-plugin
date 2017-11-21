const app = require('./server/app');
const entity = require('./lib/entity');
const indexDomain = require('./lib/index-domain');
const initializeIndex = require('./lib/initialize-index');

function plugin(config, warpCore, Persistence) {
    return (baseUrl, staticUrl) => app(config, warpCore, Persistence, baseUrl, staticUrl);
}

plugin.initializeIndex = (config) => initializeIndex(config);
plugin.entity = entity;
plugin.indexDomain = (config, warpCore) => indexDomain(config, warpCore);

module.exports = plugin;
