import { createFrame, createDefaultLocals } from '../utils';

export default function renderToString(tree, props, config) {
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
  var str = '';

  str += '<' + tree.tagName;
  str += renderAttributesObject(attrs);
  
  if (tree.children && tree.children.length > 0) {
    var frame = createFrame(tree.children, createDefaultLocals(tree, props));
    str += '>' + renderTree(frame, props, config);
    str += '</' + tree.tagName;
  }

  return str + '>';
}

function renderComponent(tree, props, config) {
  var component = config.components.get(tree.name);
  var cattrs = createAttributesObject(component.attrs, props, config)
  var attrs = createAttributesObject(tree.attrs, props, config)
  var tagName = attrs.tagName || component.tagName;
  var str = '';

  // concat classes
  attrs.class = cattrs.class + ' ' + attrs.class;

  str += '<' + tagName;
  str += renderAttributesObject(attrs);

  if (tree.children && tree.children.length > 0) {
    var frame = createFrame(tree.children, createDefaultLocals(tree, props));
    str += '>' + renderTree(frame, props, config);
    str += '</' + tagName;    
  }

  return str + '>';
}

function renderHelper(tree, props, config) {
  var attrs = createAttributesObject(tree.attrs, props, config);
  var copy = Object.assign({}, tree, { 
    data: attrs.data, 
    attrs: attrs
  });

  var result = config.helpers.get(tree.name).call(null, copy, props);
  var frame = createFrame(result, createDefaultLocals(copy, props));

  return renderTree(frame, props, config)
}

function createAttributesObject(attrs, props, config) {
  var obj = {};
  for(var a in attrs) {
    let attr = attrs[a];
    let key = attr.name;
    let value = attr.value;

    if (Array.isArray(attr.name)) key = renderTree(attr.name, props, config);
    if (attr.data) {
      if (attr.name == 'data' && attr.data.length === 1 && attr.data[0].type === 'variable') {
        value = renderTree(attr.data[0], props, config);
      } else {
        value = renderTree(attr.data, props, config);
      }
    }


    obj[key] = value;
  }
  return obj;
}

function renderAttributesObject(obj) {
  var str = '';
  var rejects = ['tagName'];

  for(var key in obj) {
    if (rejects.indexOf(key) === -1) {
      str += ' ' + key + '="' + obj[key] + '"';    
    }
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
  var obj = props;
  var path = tree.path;


  for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
    obj = obj[path[i]];
  }

  return Array.isArray(obj) ? obj : obj !== undefined ? obj.toString() : undefined;
}