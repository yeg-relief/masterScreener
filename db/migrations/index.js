const
elasticsearch = require('elasticsearch'),
migrate       = require('./migrate'),
config        = require('../config');

migrate.initDB(config);
