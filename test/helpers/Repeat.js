var createFrame = require('../../dist').createFrame;
var createDefaultLocals = require('../../dist').createDefaultLocals;
var getVariable = require('../../dist').getVariable;
var assign = require('object-assign');

module.exports = function(attrs, tree, props) {
  var locals = createDefaultLocals(props, attrs);
  var mapper = getVariable(props, attrs.key);
  if (Array.isArray(mapper)) {
    return mapper.map((data, i) => {
      return createFrame(tree, assign({}, locals, {
        '@data': data,
        '@index': i
      }));
    });
  }
};
