const es = require('elasticsearch');
const Promise = require('bluebird');

module.exports = (config, q, p) => Promise.resolve()
    .then(() => new es.Client({ host: config.host }))
    .then((esClient) => esClient.search({
        index: config.indexName,
        type: config.domainName,
        q,
        from: (p - 1) * (config.pageSize || 10)
    }))
    .then((result) => result.hits && result.hits ? result.hits : {})
;
