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


// <Gate key={var}>
//   <Pass key={@attrs.key} value={value}></Pass>
//   <Fail value={value}></Fail>
//   <Range! length={value} min={value} max={value}></Range!>
//   <Empty></Empty> <!-- <Size length=0></Size> -->
//   <NonEmpty></NonEmpty> <!-- <Size min=1></Size> -->
//   <Else></Else>
// </Gate>