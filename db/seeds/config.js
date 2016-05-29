const
elasticsearch = require('elasticsearch')
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'trace'});

module.exports = {
  client: client,
  masterIndex: 'master_screener',
  masterTypeName: 'master',
  responseIndex: 'response',
  responseTypeName: 'html_response'
}
