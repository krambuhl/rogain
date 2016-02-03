# Rogain

Rogain is a templating library that parses HTML-like templates into JSON compatible trees and provides tools for rendering on the server and browser.


## Templates

Rogain provides a templating language that uses case-sensitive HTML and single curly brackets, block helpers and component composition.

```html
<div>
  <Heading tagName="h1">{title}</Heading>
  <Repeat data={favoriteThings}>
    <Heading tagName="h2">{@loop.title}</Heading>
    <p>{@loop.contents}</p>
  </Repeat>
</div>
```


## Rogain.Config

```js
var config = new Rogain.Config({
    helpers: {
        Pass: require('./helpers/pass')
    },
    components: {
        Heading: require('./components/heading.json')
    }
});
```

Further documentation on the Config class can be found in the [Config Readme](README.config.md)


## Rogain.Parser

```js
var parser = new Rogain.Parser(config.helpers);
```

### parse(template)

```js
fs.readFile(__dirname + '/components/template.html')
  .then(template => parser.parse(template))
  .then(tree => {
    var output = JSON.stringify(tree)
    return fs.writeFile(__dirname + '/components/template.json', output);
  });
```


## Rendering

### Rogain.renderToString(tree, data, config)

```js
var tree = require('./components/template.json');
var data = require('./fixtures/data.json');

document.body.innerHTML = renderToString(tree, data, config);
```


## Utilities

### createDefaultLocals(props, attrs)

```js
var locals = createDefaultLocals(props, attrs);
```

### createFrame(tree, locals)

```js
var frame = createFrame(rtree, locals);
```


## Tree Utilities

### splitTree(trees, type, name)

```js
var branches = splitTree(tree.children, 'component', 'Else');
var passBranch = branches[0];
var failBranch = branches[1];
```


