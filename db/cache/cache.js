const search = require('../utils').search;

exports.Class = class Cache {
  constructor(elasticClient) {
    this.memory = new Map();
    this.client = elasticClient;

    const query = {
      "match_all" : {}
    }
    // load all responses into memory
    this.client.search(elasticClient, 'response', 'html_response', query)
    .then(
      response => {
        const hits = response.hits.hits;
        hits.forEach(e => {
          this.memory[e._source.doc.id] = e._source.doc;
        })
      },
      error => {
        throw new Error('Unable to load responses into cache!');
      }
    )
  }

  get(responses = []){
    return null;
  }
}
