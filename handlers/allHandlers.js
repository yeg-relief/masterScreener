const
models        = require('../models/index')
elasticsearch = require('elasticsearch'),
path          = require('path'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'info'});

module.exports = {
  index,
  masterScreener,
  masterSubmit
}

// handler for '/'
function index(req, res) {
  res.sendFile(path.join(__dirname + '/../static/html/index.html'));
}

// handler for '/masterScreener'
function masterScreener(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(models.masterScreener));
}

// handler for '/masterSubmit'
function masterSubmit(req, res, elasticClient = client) {
  res.setHeader('Content-Type', 'application/json');
  const transformedReq = models.scrubber.scrub(req.body);
  models.screenSubmission(transformedReq, elasticClient)
  .then(
    resp => {res.send(JSON.stringify(resp))},
    error => {res.send(JSON.stringify(error))}
  );
}
