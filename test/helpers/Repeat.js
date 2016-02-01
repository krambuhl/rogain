var createHelper = require('../../dist').createHelper;
var createFrame = require('../../dist').createFrame;
var getVariable = require('../../dist').getVariable;

module.exports = function(attrs, tree, props) {
  return getVariable(props, attrs.key).map((data, i) => {
    return createFrame(tree, { 
      '@data': data,
      '@index': i
    });
  });
};
