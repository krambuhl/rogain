import htmlparser from 'htmlparser';
import parseTree from './parseTree'

const handlerDefaults = { 
  verbose: false,
  ignoreWhitespace: true
};

const parserDefaults = {
  lowerCaseTags: false
};

export function createDefaultParser(done, opts) {
  return createParser(function(tree) {
    done(parseTree(tree[0], opts));
  }, opts);
}

export function createParser(done, options) {
  let opts = options || {};
  let handlerOptions = Object.assign({}, handlerDefaults, opts.handlerOptions);
  let parserOptions = Object.assign({}, parserDefaults, opts.parserOptions);

  var handler = new htmlparser.DefaultHandler(function (err, tree) {
    if (err) throw new Error(err);
    else if (tree.length > 1) throw new Error('Tree should contain a single root node');
    else done(tree);
  }, handlerOptions);

  return new htmlparser.Parser(handler, parserOptions);
}