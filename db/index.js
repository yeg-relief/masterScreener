const
elasticsearch = require('elasticsearch'),
init          = require('./init'),
models        = require('./models/index'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'info'});

module.exports = {
  models
}

init.testConnect(client);
// create index if not exist
const indexName = 'master_screener';
init.initIndex(client, indexName);
