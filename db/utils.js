module.exports = {
  deleteIndex,
  initIndex,
  indexExists,
  initMapping
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

function initMapping(elasticClient, mapping) {
    return elasticClient.indices.putMapping({mapping});
}
