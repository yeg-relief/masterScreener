const
express     = require('express'),
bodyParser  = require('body-parser')
app         = express(),
handlers    = require('./handlers/allHandlers');

app.use(bodyParser.json())
app.use(express.static(__dirname));

app.get('/', handlers.index);
app.get('/masterScreener', handlers.masterScreener);
app.post('/masterSubmit', handlers.masterSubmit)

app.listen(3000, "0.0.0.0", function () {
  console.log('Example app listening on port 3000!');
});
