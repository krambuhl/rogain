const renderToString = require('../dist').renderToString;
const html = require('html').prettyPrint;

const config = require('./render.config.js');
const data = require('./fixtures/data.json');

var output = renderToString(config.components.Template, data, config);


console.log('');
console.log( html(output, { unformatted: [] }) );
// console.log(output);
console.log('');