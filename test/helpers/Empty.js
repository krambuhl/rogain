var splitTree = require('../../dist/tree-utils').splitTree

module.exports = function(tree, props) {
  var split = splitTree(tree.children, 'component', 'Else');
  if (tree.data && tree.data.length === 0) return split[0];
  return split[1];
};