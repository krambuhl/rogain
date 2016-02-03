var splitTree = require('../../dist').splitTree;

module.exports = function(tree, props) {
  var split = splitTree(tree.children, 'component', 'Else');
  if (tree.data !== tree.value) return split[0];
  return split[1];
};