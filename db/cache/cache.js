const search = require('../utils').search,
      Rx     = require('@reactivex/rxjs');

exports.Class = class Cache {
  constructor(elasticClient, strategy) {
    this.memory = new Map();
    this.client = elasticClient;
    const query = {
      "match_all" : {}
    }
    /*
      load all responses into memory, we expect < 100 responses to be available
      if by some miracle we have over 100 benefits to navigate through,
      then I'll gladly implement a more innovative cache.
    */
    this.client.search(elasticClient, 'response', 'html_response', query)
    .then(
      response => {
        const hits = response.hits.hits;
        hits.forEach(e => {
          this.memory[e._source.doc.id] = e._source.doc;
        })
      },
      error => {
        console.log(error);
        throw new Error(`Unable to load responses into cache!`);
      }
    )
  }

  /*
    this assumes that all responses are in the memory... maybe a little too
    optimistic? At the moment there is a small number of programs and as long
    as we ensure that all new programs are pushed to both the cache memory and
    the elasticsearch server, then it should be ok.

    This is on a synchronous scheduler
  */
  getSync(ids){
    return Rx.Observable.from(ids)
           //filter out the misses this is not a good practice
           // partitioning the the observable into defined and undefined
           // and then fetching the undefined values from ES is an attractive
           // strategy. 
           .filter( id => typeof this.memory[id] !== 'undefined')
           .reduce( (hits, curr) => {
             hits.responses.push(this.memory[curr])
             return hits
           }, {responses: [] });
  }

  set(res){
    this.memory[res.id] = res;
  }
}
