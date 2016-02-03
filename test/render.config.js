const RogainConfig = require('../dist').Config;

var config = new RogainConfig({
  helpers: require('./helpers/helpers.js'),
  components: require('./fixtures/templates.json')
});

module.exports = config;