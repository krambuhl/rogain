var getVar = require('../../dist').getVar;
module.exports = function(attrs, children, props) {
  if (getVar(props, attrs.key) === attrs.value) return children;
};