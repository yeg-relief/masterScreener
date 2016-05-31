const
utils = require('../utils');

// key for master questionnaire
const masterQ = 'MASTER_QUESTIONNAIRE';

exports.Class = class DB {
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
        // TODO: ensure doc is found before saving?
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
    .then(
      () => {
        return Promise.resolve(utils.get(this.client, 'questionnaire', 'master', 'questionnaire' ))
      }
    )
    .then(
      response => {
        if(response.found === true){
          const doc = response._source.doc;
          this.memory.set(masterQ, doc);
          return Promise.resolve(this);
        }
        return Promise.reject(response._found);
      },
      error => {
        console.log(error);
        return Promise.reject(`Unable to load master questionnaire into cach\n${error}`);
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


  // hide this behind a proxy?
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

// work in progress
exports.Proxy = client => {
  const db = new DB(client)
  return new Proxy(db, {
    const state = {initialized: false};
    get: (obj, prop) => {
      if(prop === 'memory'){
        throw new Error('the DB memory property is a private property.');
      }
      const origMethod = target[prop];
      return function (...args) {
        if(this.state.initialized === true && prop === 'loadInitial'){
          throw new Error('DB is being initialized twice');
        }
        let result = origMethod.apply(this, args);
        return result;
      };
    }
  });
}
