export default function createFrame(tree, locals) {
  return {
    type: 'frame',
    children: tree,
    locals: locals
  }
}