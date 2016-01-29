const fs = require('fs');
const createDefaultParser = require('../dist').createDefaultParser;

var start = +new Date();
var parser = createDefaultParser(function(tree) {
  console.log((+new Date() - start) + 'ms')
});

fs.readFile(__dirname + '/fixtures/template.html', function(err, template) {
  parser.parseComplete(template)
});