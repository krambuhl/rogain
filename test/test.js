const fs = require('fs');
const Rogain = require('../dist').default;
const createDefaultParser = require('../dist').createDefaultParser;
const renderToString = require('../dist').renderToString;

const html = require('html').prettyPrint;

const inst = new Rogain({
  helpers: {
    Range: require('./helpers/Range'),
    Repeat: require('./helpers/Repeat'),
    Pass: require('./helpers/Pass'),
    Fail: require('./helpers/Fail'),
  }
});

var parser = createDefaultParser(function(tree) {
  console.log(html(renderToString(tree, {
    'articles': [{
      title: 'bread',
      contents: 'Lorem ipsum Incididunt cupidatat laborum.',
      href: '#/bread'
    }, {
      title: 'evil dish',
      contents: 'Krommally bizol boot red hat strollen bruchwise',
      href: '#/moooore'
    }, {
      title: 'Corn',
      contents: 'Lorem ipsum Incididunt cupidatat laborum.',
      href: '#/bread'
    }, {
      title: 'super dish',
      contents: 'Krommally bizol boot red hat strollen bruchwise',
      href: '#/moooore'
    }]
  }, inst)));
}, { rogainInstance: inst });

fs.readFile(__dirname + '/fixtures/template.html', function(err, template) {
  parser.parseComplete(template)
});