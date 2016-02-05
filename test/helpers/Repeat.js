var createFrame = require('../../dist/utils/createFrame');
var createDefaultLocals = require('../../dist/utils/createDefaultLocals');
var assign = require('object-assign');

module.exports = function(tree, props) {
  var locals = createDefaultLocals(tree, props);
  if (Array.isArray(tree.data)) {
    return tree.data.map((data, i) => {
      return createFrame(tree.children, assign({}, locals, {
        '@loop': data,
        '@index': i
      }));
    });
  }
};
