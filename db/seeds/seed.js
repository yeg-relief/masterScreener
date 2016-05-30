const
utils         = require('../utils'),
indices       = require('./indices/index'),
percolators   = require('./percolators/index'),
responses     = require('./responses/index'),
elasticsearch = require('elasticsearch');

module.exports = {
  initDB
}

/**
  tests the connection to the elastic search server
  @param {Object} elasticClient - driver for elasticsearch
  @return {Promise}
 */
function testConnect(elasticClient) {
  return new Promise(
    (resolve, reject) => {
        elasticClient.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: Infinity,
        // undocumented params are appended to the query string
        hello: "elasticsearch!"
      }, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(console.log('Elasticsearch Client can connect'));
        }
      });
    }
  );
}


/**
  @param {string} indexName - the name of the index to initialize.
  @return {Promise.all}
 */
function initPercolators(elasticClient, indexName) {
  const queries     = percolators.queries,
        promises    = [];
  queries.forEach( e => {
    promises.push(utils.addPercolator(elasticClient, indexName, e.id, e.query));
  });
  return Promise.all(promises);
}

function initResponses(elasticClient, indexName, typeName) {
  const templates = responses.items,
        promises  = [];
  templates.forEach( e => {
    promises.push(utils.indexDoc(elasticClient, indexName, e.id, typeName, e));
  });
  return Promise.all(promises);
}

/**
  Executes a chain of promises to initialize the Elasticsearch backend.
  @param {Object} config - contains Elasticsearch client along with type + index names (strings)
 */
function initDB() {
  const
  client   = new elasticsearch.Client({host: 'localhost:9200', log: 'trace'}),
  master   = indices.items[0],
  response = indices.items[1];


  testConnect(client)
  .catch( e => {
    console.log(`exiting with ${e}\non testing connection.`);
    process.exit(1);
  })
  .then(utils.initIndex(client, master.index, master.mappings))
  .catch( e => {
    console.log(`exiting with ${e}\non initiating master index.`);
    process.exit(2);
  })
  .then(utils.initIndex(client, response.index, response.mappings))
  .catch ( e => {
    console.log(`exiting with ${e}\non initiating response index.`);
    process.exit(4);
  })
  .then(initPercolators(client, master.index))
  .catch ( e => {
    console.log(`exiting with ${e}\non indexing percolators.`);
    process.exit(6);
  })
  .then(initResponses(client,response.index, response.type))
  .catch ( e => {
    console.log(`exiting with ${e}\non indexing response percolators.`);
    process.exit(6);
  })
}
