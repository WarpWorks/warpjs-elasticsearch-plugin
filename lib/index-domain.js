const _ = require('lodash');
// const debug = require('debug')('W2:plugin:elasticsearch:index-domain');
const es = require('elasticsearch');
const Promise = require('bluebird');

const searchEntity = require('./entity');

module.exports = (config, warpCore) => {
    const Persistence = require(config.persistence.module);
    const persistence = new Persistence(config.persistence.host, config.persistence.name);

    const esClient = new es.Client({ host: config.host });

    const indexMeta = {
        _index: config.indexName,
        _type: config.domainName
    };

    return Promise.resolve()
        .then(() => warpCore.getDomainByName(config.domainName))
        .then((domain) => domain.getDocumentEntities())
        .then((entities) => Promise.reduce(
            entities,
            (accumulator, entity) => Promise.resolve()
                .then(() => entity.getDocuments(persistence))
                .then((docs) => Promise.filter(docs, (doc) => {
                    if (doc.type === "PathAlias") {
                        return false;
                    }

                    return true;
                }))
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
        .finally(() => persistence.close())
    ;
};
