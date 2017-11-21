const es = require('elasticsearch');
const Promise = require('bluebird');

const mapping = require('./mapping');

module.exports = (config) => {
    const client = new es.Client({ host: config.host });

    return Promise.resolve()
        .then(() => client.ping({requestTimeout: 1000}))

        // Check for index, and create if needed.
        .then(() => client.indices.exists({ index: config.indexName }))
        .then((indexExists) => indexExists ? null : client.indices.create({ index: config.indexName }))

        // Check for type, and create if needed.
        .then(() => client.indices.existsType({ index: config.indexName, type: config.domainName }))
        .then((typeExists) => typeExists ? null : client.indices.putMapping({ index: config.indexName, type: config.domainName, body: mapping }))
    ;
};
