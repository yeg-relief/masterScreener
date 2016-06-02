const percolate = require('../db/utils').percolateDocument;

exports.helpers = {
  processInput
}

exports.Class = class Search{
  constructor(client){
    this.client = client;
  }
  // TODO: ensure there is no percolation of an empty doc or empty object literal, ie {}
  screenSubmission(input){
    const processedInput = processInput(input);
    return  percolate(this.client, 'master_screener', 'master', processedInput)
            .then( resp => {
              const matches = resp.matches
                                  .reduce( (accum, hit) => {
                                    accum.push(hit._id);
                                    return accum;
                                  }, [])
              return Promise.resolve(matches);
            }, error => {
              return Promise.reject(error);
            });
  }
}

function processInput(input){
  const falseReg  = /_no|_false|false/;
  return Object.keys(input)
               .filter(key => input[key] !== "")
               .reduce( (output, key) => {
                 const val   = input[key],
                       split = key.split(falseReg);
                 if(val === ''){
                   return output;
                 }
                 if(val === 'checked' && split.length === 1){
                   output[split[0]] = true;
                   return output;
                 }
                 if(val === 'checked' && split.length === 2 ){
                   output[split[0]] = false;
                   return output;
                 }
                 if(!isNaN(input[key])){
                   output[key] = parseInt(input[key], 10);
                   return output;
                 }
                 return output;
               }, {});

}
