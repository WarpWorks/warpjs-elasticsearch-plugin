const app = require('./server/app');
const entity = require('./lib/entity');
const getUrl = require('./lib/get-url');
const indexDocument = require('./lib/index-document');
const indexDomain = require('./lib/index-domain');
const initializeIndex = require('./lib/initialize-index');

function plugin(config, warpCore, Persistence) {
    return (baseUrl, staticUrl) => app(config, warpCore, baseUrl, staticUrl);
}

plugin.initializeIndex = (config) => initializeIndex(config);
plugin.entity = entity;
plugin.getUrl = () => getUrl();
plugin.indexDocument = (config, persistence, entity, instance) => indexDocument(config, persistence, entity, instance);
plugin.indexDomain = (config, warpCore) => indexDomain(config, warpCore);

module.exports = plugin;