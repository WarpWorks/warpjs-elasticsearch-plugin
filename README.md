# WarpJS ElasticSearch plugin

ElasticSearch implementation for the search plugin for WarpJS.

## Configuration

Add the following configuration to the `plugins` list:

  {
    "name": "ElasticSearch plugin",
    "moduleName": "@warp-works/warpjs-elasticsearch-plugin",
    "path": "/search",
    "type": "search",
    "config": {
      "host": "http://localhost:9200",
      "indexName": "warpjs"
    }
  }


## API


### plugin(config, warpCore, Persistence)

Prepare the plugin to be used.


### plugin.initializeIndex(config)

Create the index and mapping. The index name is `config.indexName` and the type
is `config.domainName`. The current mapping can be found in
[mapping.js](lib/initialize-index/mapping.js).


### plugin.entity.generateId(instance)

Generate an ID for the indexing service. This will generate an ID from
`${instance.type}:${instance.id}`.


### plugin.entity.payload(persistence, entity, instance)

This function generate the payload to be used to add to the indexing service.
