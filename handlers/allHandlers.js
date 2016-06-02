const
models        = require('../models/index')
elasticsearch = require('elasticsearch'),
path          = require('path'),
client        = new elasticsearch.Client({host: 'localhost:9200', log: 'info'}),
DB            = require('../db/index').Class;

module.exports = {
  editor,
  index,
  masterScreener,
  masterSubmit
}

const db = new DB(client);
// async function make synchronous?
db.loadInitial();

// handler for '/'
function index(req, res) {
  res.status(200);
  res.sendFile(path.join(__dirname + '/../static/html/index.html'));
}
// handler for '/editor'
function editor(req, res) {
  res.status(200);
  res.sendFile(path.join(__dirname + '/../static/html/vsaq_editor.html'));
}

// handler for '/masterScreener'
function masterScreener(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.get(['questionnaire'])
    .then( resArray => {
      if(resArray.length === 1){
        return Promise.resolve(JSON.stringify(resArray[0]));
      } else {
        return Promise.reject(resArray.length);
      }
    })
    .then( questionnaire => {
      res.status(200);
      res.send(questionnaire);
    },
      error => {
        res.status(500);
        res.send({error: `found ${error} responses for master questionnaire in database`});
      }
    )
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
