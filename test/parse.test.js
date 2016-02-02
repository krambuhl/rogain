const fs = require('fs-promise');
const config = require('./parser.config.js');
const Parser = require('../dist').Parser;

var parser = new Parser(config.helpers);

fs.readFile(__dirname + '/fixtures/template.html')
  .then(template => parser.parse(template))
  .then(tree => JSON.stringify(tree))
  .then(output => {
    return fs.writeFile(__dirname + '/fixtures/template.json', output)
  });