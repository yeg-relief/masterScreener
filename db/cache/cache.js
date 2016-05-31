const
utils = require('../utils');


exports.Class = class Cache {
  constructor(elasticClient) {
    this.memory = new Map();
    this.client = elasticClient;
  }

  loadInitial(){
    const query = {
      "match_all" : {}
    }

    return utils.search(this.client, 'response', 'html_response', query)
    .then(
      response => {
        const hits = response.hits.hits;
        hits.forEach(e => {
          this.memory.set(e._source.doc.id, e._source.doc);
        })
        return Promise.resolve(this)
      },
      error => {
        console.log(error);
        return Promise.reject(`Unable to load responses into cache!\n${error}`);
      }
    )
  }

  fetch(ids){
    return utils.mGet(this.client, 'response', 'html_response', ids)
           .then(
             response => {
               const hits = response.docs
                            .filter( doc => doc.found === true)
                            .map( doc => {
                              this.set(doc._source.doc);
                              return doc._source.doc
                            })
               return Promise.all(hits);
             },
             error => {
               return Promise.reject(error);
             }
           )
  }
  
  get(ids){
    const partition =  ids.reduce( (accumulator, id) => {
                          const val = this.memory.get(id);
                          if(typeof val !== 'undefined'){
                            accumulator.hits.push(val);
                          } else {
                            accumulator.misses.push(id);
                          }
                          return accumulator;
                        }, {hits: [], misses: []});
    if(partition.misses.length === 0){
      return Promise.all(partition.hits);
    }
    return Promise.all(partition.hits.concat(this.fetch(partition.misses)))
           .then(res => {
             return Promise.resolve([].concat.apply([], res));
           })
  }


  // bounding unnecessary?
  set(res){
    if(this.memory.size <= 100){
      this.memory.set(res.id, res);
      return true;
    }
    return false;
  }

  delete(id){
    return this.memory.delete(id)
  }
}
