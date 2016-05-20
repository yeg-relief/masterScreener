const
scrubber            = require('./submitScrubber'),
utils               = require('../db/utils'),
childHealthBenefit  = require('./childHealthBenefit').description,
masterScreener      = require('./masterScreener').questionaire;

/*
 TODO:  consider if this is the proper module for these functions
        these functions being the ones that are related to the
        transformation and percolation of client submissions
        and formating server response.
*/
module.exports = {
  scrubber,
  childHealthBenefit,
  screenSubmission,
  masterScreener
}

/**
  Run a "scrubbed" or transformed client submission against the indexed
  percolators
  @param {Object} clientSubmission - A submission from the client expected to be for masterScreener at this point
  @param {Object} elasticClient - driver for elasticsearch
  @return {Object}
 */
function screenSubmission(clientSubmission, elasticClient) {
  return utils.percolateDocument(elasticClient, 'master_screener', 'master', clientSubmission);
}

// hacky test code incoming
/*
const x = scrubber.scrub({ income: '15000',
                           commonLaw: 'checked',
                           children: 'checked',
                           children_no: '',
                           numChildren: '4' });

const
elasticsearch = require('elasticsearch'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'info'});

screenSubmission(x, client)
.then(
  resp => {console.log(resp)},
  err => {console.log(err)}
)
*/
