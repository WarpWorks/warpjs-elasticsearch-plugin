const Promise = require('bluebird');
const es = require('elasticsearch');

const searchEntity = require('./entity');

module.exports = (config, persistence, entity, instance) => Promise.resolve()
    .then(() => new es.Client({ host: config.host }))
    .then((esClient) => Promise.resolve()
        .then(() => searchEntity.payload(persistence, entity, instance))
        .then((body) => esClient({
            index: config.indexName,
            type: config.domainName,
            id: searchEntity.generateId(instance),
            body
        }))
    )
;
