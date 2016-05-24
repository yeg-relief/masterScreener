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
  res.status(200);
  res.sendFile(path.join(__dirname + '/../static/html/index.html'));
}

// handler for '/masterScreener'
function masterScreener(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(models.masterScreener));
}

// handler for '/masterSubmit'
function masterSubmit(req, res) {
  if(typeof req.body == 'undefined') {
    res.status(400);
    res.send({error: 'no request body defined'});
  }

  const template = (items) => {
    return {
      "questionnaire": [
        {
          "type": "block",
          "text": "Results",
          "items": items
        }
      ]
    };
  }
  res.setHeader('Content-Type', 'application/json');
  const transformedReq = models.scrubber.scrub(req.body);
  models.screenSubmission(transformedReq, client)
  .then(
    resp => {
      let descriptions = [];
      let i = 0;
      resp.matches.forEach( e => {
        models.matchResponse(e._id, descriptions);
      });
      res.status(200);
      const response = template(descriptions);
      res.send(response);
    },
    error => {
      res.status(500);
      res.send({error: error});
    }
  )
}
