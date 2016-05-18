const utils = require('./utils');

module.exports = {
  testConnect,
  initIndex
};

/*
  test connection
 */
function testConnect(elasticClient) {
  elasticClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,
    // undocumented params are appended to the query string
    hello: "elasticsearch!"
  }, function (error) {
    if (error) {
      throw Error('Elasticsearch Client unable to ping cluster on localhost');
    } else {
      console.log('Elasticsearch Client can connect');
    }
  });
  return true;
}


/*
  create index -- if not exists
 */
function initIndex(elasticClient, indexName) {
  utils.indexExists(elasticClient, indexName)
       .then( exists => {
          if (exists) {
            console.log(`${indexName} already exists`);
          } else {
            console.log(`creating index ${indexName}`);
            utils.initIndex(elasticClient, indexName);
          }
        });
}


/*
const mapping = {
  index: indexName,
  type: 'screenData',
  body: {
    properties: {
      "age": {type: integer},
      "income": {type: integer},
      "AISH": {type: boolean},
      "treaty_status": {type: boolean},
      "children": {type: integer},
      "number_of_children": {type: integer},
      "primary_care_giver": {type: boolean},
      "candian_resident": {type: boolean},
      "plastic_health_benefits": {type: boolean},
      "child_govt_care": {type:boolean},
      "uses_licensed_child_care": {type:boolean},
      "children_12_or_younger": {type:boolean},

    }
  }
}
*/
