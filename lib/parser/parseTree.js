export default function parseTree(dom) {
  var tree = { type: getTreeType(dom) };

  if (dom.name) {
    tree.name = parseString(dom.name);
    
    if (isSingleTextTree(tree.name)) {
      tree.name = tree.name[0].value
    }
  }

  if (dom.attribs) {
    tree.attrs = getTreeAttrs(dom.attribs);
  }

  if (dom.data) {
    let res = parseString(dom.data);
    if (isSingleTextTree(res)) {
      tree.value = res[0].value;
    } else {
      tree.data = res;
    }
  }
  
  if (dom.children) {
    tree.children = dom.children.map(child => parseTree(child));
  }

  return tree;
}

function isSingleTextTree(tree) {
  return tree.length === 1 && tree[0].type === 'text';
}

function getTreeType(dom) {
  if (dom.type === 'tag') {
    let tname = dom.name.substr(0, 1);
    if (tname === tname.toUpperCase()) {
      return 'component';
    }
  } else if (dom.type === 'text') {
    return 'textnode';
  }

  return dom.type;
}

function getTreeAttrs(attrs) {
  if (!attrs) return attrs;

  var res = [];
  for (var key in attrs) {
    var row = { name: parseString(key) };
    var data = parseString(attrs[key])

    if (isSingleTextTree(row.name)) {
      row.name = row.name[0].value;
    }

    if (isSingleTextTree(data)) {
      row.value = data[0].value;
    } else { 
      row.data = data;
    }

    res.push(row);
  }

  return res;
}


function parseString(str) {
  var matches = str.match(/{(.*?)}/gi);
  if (matches) {
    let bits = str.split(/{(.*?)}/gi).filter(bit => bit !== '');
    matches = matches.map(match => match.substr(1, match.length - 2));
    
    return bits.map(bit => {
      if (matches.indexOf(bit) !== -1) {
        let { path, filters } = parseExpression(bit);
        var node = { type: 'variable', path: path };
        if (filters && filters.length) node.filters = filters;
        return node;
      }

      return { type: 'text', value: bit };
    });
  }

  return [{ type: 'text', value: str }];
}

function parseExpression(exp) {
  var bits = exp.split('|');
  return {
    path: bits.shift(),
    filters: bits
  }
}