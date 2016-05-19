const
elasticsearch = require('elasticsearch'),
migrate       = require('./migrate'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'trace'});

const config = {
  client: client,
  masterIndex: 'master_screener',
  masterTypeName: 'master'
}

// initialize the database
// TODO: define some logic such that the datstore is initialized or not
// ie, we don't need to initialize the datastore everytime.
migrate.initDB(config);
