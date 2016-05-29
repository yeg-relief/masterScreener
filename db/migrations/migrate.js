const
utils           = require('../utils'),
mapper          = require('./aggregator'),
responseMapping = require('../../models/response').mapping;

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
function initMasterMapping(elasticClient, indexName, typeName, mapping) {
  return utils.initMapping(elasticClient, indexName, typeName, mapping);
}

/**
  Calls gatherQueries() from modesl/index.js using this queries to generate an
  array of index percolator promises, and then returns this array, ie, indexes
  all the queries from the individual models.
  @param {Object} elasticClient - driver for elasticsearch.
  @param {string} indexName - the name of the index to initialize.
  @return {Promise.all}
 */
function initPercolators(elasticClient, indexName) {
  const queries = mapper.gatherQueries();
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
  const masterMapping   = mapper.generateMasterMapping(mapper.gatherScreenerMappings());

  testConnect(config.client)
  // master index and mappings
  .then(utils.initIndex(config.client, config.masterIndex))
  .then(utils.initMapping(config.client, config.masterIndex, config.masterTypeName, masterMapping))
  // response index and mappings
  .then(utils.initIndex(config.client, config.responseIndex))
  .then(utils.initMapping(config.client, config.responseIndex, config.responseTypeName, responseMapping))
  .then(initPercolators(config.client, config.masterIndex))
  .catch( e => {
    console.log(`exiting with ${e}`);
    process.exit(1);
  })
}
