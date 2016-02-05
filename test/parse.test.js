const fs = require('fs-promise');
const config = require('./parser.config.js');
const Parser = require('../dist').Parser;

var parser = new Parser(config);
var components = ['Heading', 'Link', 'Template'];

var templates = components.map(name => {
  return fs.readFile(__dirname + `/components/${name}.html`)
    .then(template => parser.parse(template))
    .then(tree => ({ name: name, tree: tree }))
    .catch(err => { console.error(err) })
});


Promise.all(templates).then(allTemplates => { 
  var output = allTemplates.reduce((all, def) => {
    all[def.name] = def.tree;
    return all;
  }, {});

  return fs.writeFile(__dirname + '/fixtures/templates.json', JSON.stringify(output, null, 2));
});