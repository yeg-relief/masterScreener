const express = require('express'),
      path    = require('path'),
      app     = express(),
      test    = require('./questionaire');


app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/html/index.html'));
});
app.get('/test', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(test));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
