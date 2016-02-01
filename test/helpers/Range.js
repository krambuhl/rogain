var getVariable = require('../../dist').getVariable;

module.exports = function(attrs, children, props) {
  var data = parseInt(getVariable(props, attrs.key), 10);
  var min = parseInt(attrs.min, 10);
  var max = parseInt(attrs.max, 10);
  var passing = false;

  if (!isNaN(min) && !isNaN(max)) {
    if (data >= min && data <= max) passing = true;
  } else if (!isNaN(min)) {
    if (data >= min) passing = true;
  } else if (!isNaN(max)) {
    if (data <= max) passing = true;
  }

  return passing ? children : undefined;
};