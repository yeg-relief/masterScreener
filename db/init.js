const
utils = require('./utils'),
modelIndex = require('./models/index');

module.exports = {
  initDB
};

/*
  test connection
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


/*
  create index -- if not exists
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

function initMasterMapping(elasticClient, indexName, typeName) {
  const mapping = modelIndex.generateMasterMapping(modelIndex.gatherScreenerMappings());
  return utils.initMapping(elasticClient, indexName, typeName, mapping);
}

function initPercolators(elasticClient, indexName) {
  const queries = modelIndex.gatherQueries();
  console.log(queries);
  let percolators = [];
  queries.forEach((element, index, array) => {
    console.log(element.query);
    percolators.push(utils.addPercolator(elasticClient, indexName, element.id, element.query));
  });
  return Promise.all(percolators);
}


function initDB(config) {
  testConnect(config.client)
  .then(initIndex(config.client, config.masterIndex))
  .then(initMasterMapping(config.client, config.masterIndex, config.masterTypeName))
  .then(initPercolators(config.client, config.masterIndex));
}
