const
elasticsearch = require('elasticsearch'),
init          = require('./init'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'trace'});

init.testConnect(client);
// create index if not exist
const indexName = 'master_screener';
init.initIndex(client, indexName);
const typeName = 'master';
init.initMasterMapping(client, indexName, typeName);
