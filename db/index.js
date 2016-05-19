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
// TODO: define some logic such that the datstore is initialized or not
// ie, we don't need to initialize the datastore everytime. 
init.initDB(config);
