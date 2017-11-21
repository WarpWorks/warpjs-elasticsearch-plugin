const _ = require('lodash');
const debug = require('debug')('W2:plugin:elasticsearch:index-domain');
const es = require('elasticsearch');
const Promise = require('bluebird');

const searchEntity = require('./entity');

module.exports = (config, warpCore) => {
    const Persistence = require(config.persistence.module);
    const persistence = new Persistence(config.persistence.host, config.persistence.name);

    const esClient = new es.Client({ host: config.host });

    const domain = warpCore.getDomainByName(config.domainName);
    const entities = domain.getDocumentEntities();

    const indexMeta = {
        _index: config.indexName,
        _type: config.domainName
    };

    return Promise.resolve()
        .then(() => Promise.reduce(
            entities,
            (accumulator, entity) => Promise.resolve()
                .then(() => entity.getDocuments(persistence))
                .then((docs) => Promise.map(docs, (doc) => searchEntity.payload(persistence, entity, doc)))
                .then((docs) => accumulator.concat(docs))
            ,
            []
        ))
        .then((docs) => docs.reduce(
            (accumulator, doc) => accumulator.concat([
                { index: _.extend({}, indexMeta, { _id: searchEntity.generateId(doc) }) },
                doc
            ]),
            []
        ))
        .then((body) => esClient.bulk({ body }))
        .then((resp) => debug("bulk(): resp=", resp.errors ? "[ERRORS]" : `items indexed: ${resp.items.length}`))
        // .then((resp) => debug("bulk(): resp=", JSON.stringify(resp, null, 2)))
        .finally(() => persistence.close())
    ;
};
