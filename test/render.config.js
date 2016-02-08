const Config = require('rogain-config');

var config = new Config(require('../dist').core)
config.components.register(require('./fixtures/templates.json'))

module.exports = config;