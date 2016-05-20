const express     = require('express'),
      path        = require('path'),
      bodyParser  = require('body-parser')
      app         = express(),
      test        = require('./models/masterScreener').questionaire;

app.use(bodyParser.json())
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/html/index.html'));
});

app.get('/test', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(test));
});

app.post('/submit_handler', function (req, res) {
  console.log(req.body);
  res.send(JSON.stringify({success: true}));
});

app.listen(3000, "0.0.0.0", function () {
  console.log('Example app listening on port 3000!');
});
