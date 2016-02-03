## Rogain.Config

```js
var config = new Rogain.Config();
```

### registerHelper(name, fn)

```js
config.registerHelper('Repeat', function(tree, props) {
  var locals = Rogain.createDefaultLocals(props, tree.attrs);

  return attrs.data.map((data, i) => {
    return createFrame(tree.children, Object.assign({}, locals, { 
      '@data': data, 
      '@index': i 
    }));
  });
});
```

### registerHelpers(helpersObj)

```js
config.registerHelpers({
    Pass: require('./helpers/pass'),
    Fail: require('./helpers/fail'),
})
```

### unregisterHelper(name)

```js
config.unregisterHelper('Repeat');
```

### registerComponent(name, tree)

```js
var HeadingTree = {
  type: 'tag',
  tagName: 'h3',
  attrs: [{ name: 'class', value: 'heading' }]
  data: [{
    type: 'variable',
    path: '@children'
  }]
}

config.registerComponent('Heading', HeadingTree);
```

### registerComponents(componentsObj)

```js
config.registerHelpers({
    Heading: require('./components/heading.json'),
    Link: require('./components/link.json'),
})
```

### unregisterComponent(name)

```js
config.unregisterComponent('Heading');
```
