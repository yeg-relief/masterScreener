const
elasticsearch = require('elasticsearch'),
init          = require('./init'),
models        = require('./models/index'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'trace'});

module.exports = {
  models
}

const config = {
  client: client,
  masterIndex: 'master_screener',
  masterTypeName: 'master'
}

// initialize the database
init.initDB(config);
