import htmlparser from 'htmlparser';
import parseTree from './parseTree'

const handlerDefaults = { 
  verbose: false,
  ignoreWhitespace: true,
  enforceEmptyTags: false
};

const parserDefaults = {
  lowerCaseTags: false
};

export class Parser {
  constructor(helpers, options) {
    let opts = options || {};
    this.helpers = helpers || {}
    this.handlerOptions = Object.assign({}, handlerDefaults, opts.handlerOptions);
    this.parserOptions = Object.assign({}, parserDefaults, opts.parserOptions);
  }

  parse(template) {
    return new Promise((accept, reject) => {
      var handler = new htmlparser.DefaultHandler((err, tree) => {
        if (err) reject(err);
        else if (tree.length > 1) reject('Tree should contain a single root node');
        else accept(parseTree(tree[0], this.helpers));
      }, this.handlerOptions);

      var parser = new htmlparser.Parser(handler, this.parserOptions);
      parser.parseComplete(template.toString())
    });

  }
}