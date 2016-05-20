const
scrubber  = require('./submitScrubber'),
utils     = require('../db/utils');

module.exports = {
  scrubber
}

/**
  Run a "scrubbed" or transformed client submission against the indexed
  percolators
  TODO: consider if this is the proper module for this function
  @param {Object} clientSubmission - A submission from the client expected to be for masterScreener at this point
  @param {Object} elasticClient - driver for elasticsearch
  @return {Object}
 */
function screenSubmission(clientSubmission, elasticClient) {
  return utils.percolateDocument(elasticClient, 'master_screener', 'master', clientSubmission);
}

// hacky test code incoming

const x = scrubber.scrub({ income: '15000',
                           commonLaw: 'checked',
                           children: 'checked',
                           children_no: '',
                           numChildren: '4' });

const
elasticsearch = require('elasticsearch'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'trace'});

screenSubmission(x, client)
.then(
  (resp) => {console.log(resp)},
  (err) => {console.log(err)}
)
