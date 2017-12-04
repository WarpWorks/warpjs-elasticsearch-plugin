const app = require('./server/app');
const entity = require('./lib/entity');
const getDocument = require('./lib/get-document');
const getUrl = require('./lib/get-url');
const indexDocument = require('./lib/index-document');
const indexDomain = require('./lib/index-domain');
const initializeIndex = require('./lib/initialize-index');

function plugin(config, warpCore, Persistence) {
    // here
    return (baseUrl, staticUrl) => app(config, warpCore, baseUrl, staticUrl);
}

plugin.initializeIndex = (config) => initializeIndex(config);
plugin.entity = entity;
plugin.getDocument = (config, type, id) => getDocument(config, type, id);
plugin.getUrl = () => getUrl();
plugin.indexDocument = (config, persistence, entity, instance) => indexDocument(config, persistence, entity, instance);
plugin.indexDomain = (config, warpCore) => indexDomain(config, warpCore);

module.exports = plugin;
