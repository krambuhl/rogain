var splitTree = require('../../dist/tree-utils').splitTree

module.exports = function(tree, props) {
  var split = splitTree(tree.children, 'component', 'Else');
  if (tree.data === tree.attrs.value) return split[0];
  return split[1];
};