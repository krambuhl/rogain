export default function(attrs, children) {
  let key = attrs.key
  let gates = treeHelpers.splitAtHelper(children);
  var winner = undefined;
  var index = 0;

  while(winner === undefined && index < gates.length) {
    let gate = gates[index++];
    
    if (gate.name !== 'Else') {
      winner = treeHelpers.applyHelper(gate, this, attrs, children);
    
      if (winner !== undefined) {
        return winner;
      }
    }
  }

  let gate = treeHelpers.findHelper('Else');
  return treeHelpers.applyHelper(gate, this, attrs, children);
}