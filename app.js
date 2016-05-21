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

const port = 3000;
app.listen(port, "0.0.0.0", function () {
  console.log(` http://localhost:${port}/`);
});
