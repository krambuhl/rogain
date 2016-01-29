import htmlparser from 'htmlparser';
import parseTree from './parseTree'

const handlerOptions = { 
  verbose: false,
  ignoreWhitespace: true
};

const parserOptions = {
  lowerCaseTags: false
};

export function createDefaultParser(done) {
  return createParser(function(tree) {
    done(parseTree(tree[0]));
  });
}

export function createParser(done) {
  var handler = new htmlparser.DefaultHandler(function (err, tree) {
    if (err) throw new Error(err);
    else if (tree.length > 1) throw new Error('Tree should contain a single root node');
    else done(tree);
  }, handlerOptions);

  return new htmlparser.Parser(handler, parserOptions);
}

export { parseTree };