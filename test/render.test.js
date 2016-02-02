const renderToString = require('../dist').renderToString;
const html = require('html').prettyPrint;
const config = require('./render.config.js');

var tree = require('./fixtures/template.json');
var data = require('./fixtures/data.json');

var output = renderToString(tree, data, config);
console.log( html(output) );