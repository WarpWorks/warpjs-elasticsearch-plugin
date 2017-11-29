const es = require('elasticsearch');

const searchEntity = require('./entity');

module.exports = (config, persistence, entity, instance) => {
    const esClient = new es.Client({ host: config.host });

    return Promise.resolve()
        .then(() => searchEntity.payload(persistence, entity, instance))
        .then((body) => esClient({
            index: config.indexName,
            type: config.domainName,
            id: searchEntity.generateId(instance),
            body
        }))
    ;
};
