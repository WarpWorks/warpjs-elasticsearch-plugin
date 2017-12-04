const es = require('elasticsearch');
const Promise = require('bluebird');

const entity = require('./entity');

module.exports = (config, type, id) => Promise.resolve()
    .then(() => new es.Client({ host: config.host }))
    .then((esClient) => esClient.get({
        index: config.indexName,
        type: config.domainName,
        id: entity.generateId({ type, id })
    }))
    .then((result) => result ? result._source : null)
    .catch(() => null)
;
