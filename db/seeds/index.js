const
elasticsearch = require('elasticsearch'),
migrate       = require('./seed'),
config        = require('../config');

seed.initDB(config);
