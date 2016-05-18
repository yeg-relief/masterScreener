module.exports = {
  deleteIndex,
  initIndex,
  indexExists,
  initMapping,
  mappingExists
}


function deleteIndex(elasticClient, indexName) {
  return elasticClient.indices.delete({
    index: indexName
  });
}

function initIndex(elasticClient, indexName) {
  return elasticClient.indices.create({
    index: indexName
  });
}

function indexExists(elasticClient, indexName) {
  return elasticClient.indices.exists({
    index: indexName
  });
}

function initMapping(elasticClient, indexName, typeName, properties) {
  return elasticClient.indices.putMapping({
    index: indexName,
    type: typeName,
    body: {
      properties
    }
  });
}

function mappingExists(elasticClient, indexName, typeName) {
  return elasticClient.indices.existsType({
    index: indexName,
    type: typeName
  });
}
