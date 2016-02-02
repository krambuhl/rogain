import { getVariable } from '../core/getVariable';
import { createFrame } from '../core/createFrame';
import { createDefaultLocals } from '../core/createDefaultLocals';

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
  var attrs = createAttributesObject(tree.attrs, props, inst)
  var frame = createFrame(tree.children, createDefaultLocals(props, attrs));
  var str = '<' + (tree.tagName || tree.name);

  if (tree.attrs) str += renderAttributesObject(attrs);

  str += '>' + renderTree(frame, props, inst);
  str += '</' + (tree.tagName || tree.name) + '>';

  return str;
}

function renderComponent(tree, props, inst) {
  var attrs = createAttributesObject(tree.attrs, props, inst)
  var frame = createFrame(tree.children, createDefaultLocals(props, attrs));
  var str = '<' + (tree.tagName || tree.name);

  if (tree.attrs) str += renderAttributesObject(attrs);

  str += '>' + renderTree(frame, props, inst);
  str += '</' + (tree.tagName || tree.name) + '>';

  return str;
}

function renderHelper(tree, props, inst) {
  var attrs = createAttributesObject(tree.attrs, props, inst);
  var rtree = inst.helpers[tree.name].call(null, attrs, tree.children, props);
  var frame = createFrame(rtree, createDefaultLocals(props, attrs));

  return renderTree(frame, props, inst)
}

function createAttributesObject(attrs, props, inst) {
  var obj = {};
  for(var a in attrs) {
    let attr = attrs[a];
    let key = attr.name;
    let value = attr.value;

    if (Array.isArray(attr.name)) key = renderTree(attr.name, props, inst);
    if (attr.data) value = renderTree(attr.data, props, inst);

    obj[key] = value;
  }
  return obj;
}

function renderAttributesObject(obj) {
  var str = '';
  for(var key in obj) {
    str += ' ' + key + '="' + obj[key] + '"';
  }
  return str;
}

function renderTextnode(tree, props, inst) {
  if (tree.value) return tree.value;
  return renderTree(tree.data, props, inst);
}

function renderText(tree, props, inst) {
  return tree.value;
}

function renderVariable(tree, props, inst) {
  return getVariable(props, tree.path);
}