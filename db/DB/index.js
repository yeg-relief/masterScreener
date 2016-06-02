const
utils = require('../utils');

exports.Class = class DB {
  constructor(elasticClient) {
    this.memory = new Map();
    this.client = elasticClient;
    this.state = {initialized: false}
  }

  loadInitial(){
    if(this.state.initialized === true){
      return Promise.resolve(this);
    }
    const query = {
      "match_all" : {}
    }

    return utils.search(this.client, 'response', 'html_response', query)
    .then(
      response => {
        const hits = response.hits.hits;
        // TODO: ensure doc is found before saving?
        hits.forEach(e => {
          this.cache(e._source.doc);
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
          this.cache(doc, 'questionnaire');
          this.state.initialized = true;
          return Promise.resolve(this);
        }
        return Promise.reject(response._found);
      },
      error => {
        console.log(error);
        return Promise.reject(`Unable to load master questionnaire into cache\n${error}`);
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
                              this.cache(doc._source.doc);
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

  cache(res, id){
    if(this.memory.size <= 100){
      if(id === undefined){
        this.memory.set(res.id, res);
      }else{
        this.memory.set(id, res);
      }

      return true;
    }
    return false;
  }

  delete(id){
    return this.memory.delete(id)
  }

  uploadResponse(response){
    if(!validateResponse(response)){
      return Promise.reject('attempted to upload invalid response template');
    }

    return utils
           .indexDoc(this.client, 'response', response.id, response, 'html_response')
           .then(
             response => {
               if(response.created === true){
                 return Promise.resolve(response.created);
               } else if(response.created === false){
                 return Promise.reject(response.created);
               }
               return Promise.reject(response);
             },
             error => {
               return Promise.reject(error);
             }
           )
  }

  deleteResponse(id){
    return utils
           .deleteDoc(this.client, 'response', 'html_response', id)
           .then(
             response => {
               if(response.found === true){
                 return Promise.resolve(response.found);
               } else if(response.found === false){
                 return Promise.reject(response.found);
               }
               return Promise.reject(response);
             },
             error => {
               return Promise.reject(error);
             }
           )
  }

  updateMasterMapping(newMapping){
    return utils
           .getMapping(this.client, "master_screener", 'master')
           .then(
             response => {
               const oldMapping = response.master_screener.mappings.master.properties,
                     newMapping = newMaster.mapping;
               if(typeof oldMapping === 'undefined'){
                 return Promise.reject('Unable to retrieve current mapping');
               }
               return Promise.resolve(compareProperties(newMapping, oldMapping))
             },
             error => {return Promise.reject(error)}
           )
           .then(
             newMapping => {
               return utils.initMapping(this.client, "master_screener", 'master', updatedMapping)
             },
             error => {return Promise.reject(error)}
           );
  }


  // consider how to update the master questionnaire and how this effects
  // the percolators and mater_screener/master mapping
  updateMaster(newMaster){

  }
}

// flesh out validator when response styling/content is thouroughly reviewed
// by others.
function validateResponse(response){
  // do not confuse with ES mapping... this is a property needed by front end renderer
  if(response.type !== "info"){
    return false;
  }
  if(typeof response.text !== 'string'){
    return false;
  }
  if(typeof response.id !== 'string'){
    return false;
  }
  return true;
}

// poor naming?
function compareProperties(upload, old){
  const missing = {};
  Object.getOwnPropertyNames(upload).forEach( key => {
    // this if statement has purpose or need?
    if(old.hasOwnProperty(key) && upload[key].type === old[key].type){
      return
    } else if(old.hasOwnProperty(key) && upload[key].type !== old[key].type){
      throw new Error(`attempted redefinition of ${key} from ${old[key].type} to ${upload[key].type}`)
    }
    Object.assign(missing, {key: upload[key]});
  })
  return Object.assign(old, missing);
}
