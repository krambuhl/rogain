import { getVar } from '../core/getVar';
import { createFrame } from '../core/createFrame';
import { createDefaultLocals } from '../core/createDefaultLocals';

export default renderToString;
  
export function renderToString(tree, props, config) {
  return renderTree(tree, props, config);
}

function renderTree(tree, props, config) {
  if (tree === undefined) return;

  if (Array.isArray(tree)) {
    return renderBranch(tree, props, config);
  }

  switch (tree.type) {
    case 'frame': return renderFrame(tree, props, config);
    case 'tag': return renderTag(tree, props, config);
    case 'component': return renderComponent(tree, props, config);
    case 'helper': return renderHelper(tree, props, config);
    case 'data': return renderBranch(tree, props, config);
    case 'textnode': return renderTextnode(tree, props, config);
    case 'text': return renderText(tree, props, config);
    case 'variable': return renderVariable(tree, props, config);
  }
}

function renderFrame(tree, props, config) {
  var locals = Object.assign({}, props, tree.locals);
  return renderTree(tree.children, locals, config);
}

function renderBranch(children, props, config) {
  return children.map(child => renderTree(child, props, config)).join('');
}

function renderTag(tree, props, config) {
  var attrs = createAttributesObject(tree.attrs, props, config)
  var frame = createFrame(tree.children, createDefaultLocals(props, attrs));
  var str = '<' + (tree.tagName || tree.name);

  if (tree.attrs) str += renderAttributesObject(attrs);

  str += '>' + renderTree(frame, props, config);
  str += '</' + (tree.tagName || tree.name) + '>';

  return str;
}

function renderComponent(tree, props, config) {
  var attrs = createAttributesObject(tree.attrs, props, config)
  var frame = createFrame(tree.children, createDefaultLocals(props, attrs));
  var str = '<' + (tree.tagName || tree.name);

  if (tree.attrs) str += renderAttributesObject(attrs);

  str += '>' + renderTree(frame, props, config);
  str += '</' + (tree.tagName || tree.name) + '>';

  return str;
}

function renderHelper(tree, props, config) {
  var attrs = createAttributesObject(tree.attrs, props, config);
  var rtree = config.helpers[tree.name].call(null, attrs, tree.children, props);
  var frame = createFrame(rtree, createDefaultLocals(props, attrs));

  return renderTree(frame, props, config)
}

function createAttributesObject(attrs, props, config) {
  var obj = {};
  for(var a in attrs) {
    let attr = attrs[a];
    let key = attr.name;
    let value = attr.value;

    if (Array.isArray(attr.name)) key = renderTree(attr.name, props, config);
    if (attr.data) value = renderTree(attr.data, props, config);

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

function renderTextnode(tree, props, config) {
  if (tree.value) return tree.value;
  return renderTree(tree.data, props, config);
}

function renderText(tree, props, config) {
  return tree.value;
}

function renderVariable(tree, props, config) {
  return getVar(props, tree.path);
}