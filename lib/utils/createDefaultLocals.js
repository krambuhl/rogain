export default function createDefaultLocals(tree, props) {
  return { 
    '@attrs': Object.assign({}, props['@attrs'], tree.attrs),
    '@children': tree.children,
    '@data': tree.data
  };
}