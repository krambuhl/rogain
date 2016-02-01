var getVariable = require('../../dist').getVariable;

module.exports = function(attrs, children, props) {
  if (getVariable(props, attrs.key) === attrs.value) return children;
  return undefined;
};
