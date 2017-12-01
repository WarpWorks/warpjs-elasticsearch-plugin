const es = require('elasticsearch');
const Promise = require('bluebird');

const DEFAULT_PAGE_SIZE = 10;

module.exports = (config, q, p) => Promise.resolve()
    .then(() => new es.Client({ host: config.host }))
    .then((esClient) => esClient.search({
        index: config.indexName,
        type: config.domainName,
        body: {
            query: {
                multi_match: {
                    fields: ['title', 'snippetTitle', 'snippet', 'content'],
                    query: q,
                    fuzziness: 'AUTO'
                }
            }
        },
        _sourceExclude: [
            'content'
        ],
        from: (p - 1) * (config.pageSize || DEFAULT_PAGE_SIZE),
        size: (config.pageSize || DEFAULT_PAGE_SIZE)
    }))
    .then((result) => result.hits && result.hits ? result.hits : {})
;
