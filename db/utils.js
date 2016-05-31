module.exports = {
  addPercolator,
  deleteIndex,
  get,
  indexDoc,
  indexExists,
  initIndex,
  initMapping,
  mappingExists,
  mGet,
  percolateDocument,
  search
}

/*
  Function names are self-describing.
*/
function deleteIndex(elasticClient, indexName){
  return elasticClient.indices.delete({
    index: indexName
  });
}

function initIndex(elasticClient, indexName, mappings){
  if (typeof mappings === 'undefined'){
    return elasticClient.indices.create({
      index: indexName
    });
  }
  return elasticClient.indices.create({
    index: indexName,
    body: {
      mappings
    }
  });
}

function indexExists(elasticClient, indexName){
  return elasticClient.indices.exists({
    index: indexName
  });
}

function initMapping(elasticClient, indexName, typeName, properties){
  return elasticClient.indices.putMapping({
    index: indexName,
    type: typeName,
    body: {
      properties
    }
  });
}

function mappingExists(elasticClient, indexName, typeName){
  return elasticClient.indices.existsType({
    index: indexName,
    type: typeName
  });
}

function addPercolator(elasticClient, indexName, id, query){
  return elasticClient.index({
    index: indexName,
    type: '.percolator',
    id: id,
    body: {
      query
    }
  });
}

function percolateDocument(elasticClient, indexName, typeName, doc){
  return elasticClient.percolate({
    index: indexName,
    type: typeName,
    body: {
      doc
    }
  });
}

function indexDoc(elasticClient, indexName, id, doc, type){
  if (type === undefined){
    return elasticClient.index({
      index: indexName,
      id: id,
      body: {
        doc
      }
    });
  }else{
    return elasticClient.index({
      index: indexName,
      type: type,
      id: id,
      body: {
        doc
      }
    });
  }
}

function search(elasticClient, index, type, query){
  return elasticClient.search({
    index: index,
    type: type,
    body: {
      query: query
    }
  })
}

function mGet(elasticClient, index, type, ids){
  return elasticClient.mget({
    index: index,
    type: type,
    body: {
      ids: ids
    }
  })
}

function get(elasticClient, index, type, id){
  return elasticClient.get({
    index: index,
    type: type,
    id: id
  })
}
