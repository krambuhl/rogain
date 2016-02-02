export function createDefaultLocals(props, attrs) {
  return { '@attrs': Object.assign({}, props['@attrs'], attrs) };
}