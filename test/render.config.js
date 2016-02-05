const RogainConfig = require('rogain-config');

var config = new RogainConfig({
  helpers: require('./helpers/helpers.js'),
  components: require('./fixtures/templates.json')
});

module.exports = config;