const
utils = require('../utils'),
modelIndex = require('./aggregator');

module.exports = {
  initDB
};

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
  If an index does not exist, then initialize the index. Otherwise log an message
  that it exists.
  @param {Object} elasticClient - driver for elasticsearch
  @param {string} indexName - the name of the index to initialize
  @return {Promise}
 */
function initIndex(elasticClient, indexName) {
  return new Promise(
    resolve => {
      utils.indexExists(elasticClient, indexName)
      .then( exists => {
        if(!exists) {
          resolve(utils.initIndex(elasticClient, indexName));
        } else {
          resolve(console.log(`${indexName} already exists.`))
        }
      });
    }
  );
}

/**
  Calls generateMasterMapping() from models/index.js and uses this function to
  generate a mapping for the "master index". Master index refers to the index
  which we will percolate our documents against.
  @param {Object} elasticClient - driver for elasticsearch.
  @param {string} indexName - the name of the index to initialize.
  @param {string} typeName - the name of the type to map on the index.
  @return {Promise}
 */
function initMasterMapping(elasticClient, indexName, typeName) {
  const mapping = modelIndex.generateMasterMapping(modelIndex.gatherScreenerMappings());
  return utils.initMapping(elasticClient, indexName, typeName, mapping);
}

/**
  Calls gatherQueries() from modesl/index.js using this queries to generate an
  array of index percolator promises, and then returns this array, ie, indexes
  all the queries from the individual models.
  @param {Object} elasticClient - driver for elasticsearch.
  @param {string} indexName - the name of the index to initialize.
  @return {Promise.all()}
 */
function initPercolators(elasticClient, indexName) {
  const queries = modelIndex.gatherQueries();
  let percolators = [];
  queries.forEach((element, index, array) => {
    percolators.push(utils.addPercolator(elasticClient, indexName, element.id, element.query));
  });
  return Promise.all(percolators);
}

/**
  Executes a chain of promises to initialize the Elasticsearch backend.
  @param {Object} config - contains Elasticsearch client along with type + index names (strings)
 */
function initDB(config) {
  testConnect(config.client)
  .then(initIndex(config.client, config.masterIndex))
  .then(initMasterMapping(config.client, config.masterIndex, config.masterTypeName))
  .then(initPercolators(config.client, config.masterIndex));
}
