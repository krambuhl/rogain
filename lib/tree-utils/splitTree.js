export default function splitTree(trees, type, name) {
  var res = [[]];
  trees.forEach(tree => {
    if (tree.type === type && tree.name == name) {
      res.push([]);
    } else {
      res[res.length - 1].push(tree);
    }
  });

  return res;
}