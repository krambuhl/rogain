import { getVariable } from '../core/getVariable';

export default renderToString;
  
export function renderToString(tree, props, inst) {
  return renderTree(tree, props, inst);
}

function renderTree(tree, props, inst) {
  if (tree === undefined) return;

  if (Array.isArray(tree)) {
    return renderBranch(tree, props, inst);
  }

  switch (tree.type) {
    case 'frame': return renderFrame(tree, props, inst);
    case 'tag': return renderTag(tree, props, inst);
    case 'component': return renderComponent(tree, props, inst);
    case 'helper': return renderHelper(tree, props, inst);
    case 'data': return renderBranch(tree, props, inst);
    case 'textnode': return renderTextnode(tree, props, inst);
    case 'text': return renderText(tree, props, inst);
    case 'variable': return renderVariable(tree, props, inst);
  }
}

function renderFrame(tree, props, inst) {
  var locals = Object.assign({}, props, tree.locals);
  return renderTree(tree.children, locals, inst);
}

function renderBranch(children, props, inst) {
  return children.map(child => renderTree(child, props, inst)).join('');
}

function renderTag(tree, props, inst) {
  var str = '<' + (tree.tagName || tree.name);

  if (tree.attrs) {
    tree.attrs.forEach(attr => {
      str = str + ' ' + renderAttribute(attr, props, inst);
    });
  }

  str += '>' + renderBranch(tree.children, props, inst);
  str += '</' + (tree.tagName || tree.name) + '>';

  return str;
}

function renderComponent(tree, props, inst) {
  var str = '<' + (tree.tagName || tree.name);

  if (tree.attrs) {
    tree.attrs.forEach(attr => {
      str = str + ' ' + renderAttribute(attr, props, inst);
    });
  }

  str += '>' + renderBranch(tree.children, props, inst);
  str += '</' + (tree.tagName || tree.name) + '>';

  return str;
}

function renderHelper(tree, props, inst) {
  var attrs = createAttributesObject(tree.attrs, props, inst)
  var rtree = inst.helpers[tree.name].call(null, attrs, tree.children, props);
  // var rtree = res.tree;

  if (Array.isArray(rtree)) return renderBranch(rtree, props, inst);
  return renderTree(rtree, props, inst)
}

function createAttributesObject(attrs, props, inst) {
  var obj = {};
  for(var a in attrs) {
    let attr = attrs[a];
    let key = attr.name;
    let value = attr.value;

    if (Array.isArray(attr.name)) key = renderBranch(attr.name, props, inst);
    if (attr.data) value = renderBranch(attr.data, props, inst);

    obj[key] = value;
  }
  return obj;
}

function renderAttribute(attr, props, inst) {
  var str;

  if (Array.isArray(attr.name)) {
    str = renderBranch(attr.name, props, inst);
  } else {
    str = attr.name;
  }

  str += '="';

  if (attr.data) str += renderBranch(attr.data, props, inst);
  if (attr.value) str += attr.value;

  return str + '"';
}

function renderTextnode(tree, props, inst) {
  if (tree.value) return tree.value;
  return renderBranch(tree.data, props, inst);
}

function renderText(tree, props, inst) {
  return tree.value;
}

function renderVariable(tree, props, inst) {
  return getVariable(props, tree.path);
}