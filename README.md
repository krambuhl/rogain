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

Creates a Config instance to manage components, helpers and filters use by rogain.

```js
var config = new Rogain.Config({
    helpers: {
        Pass: require('./helpers/pass')
    },
    components: {
        Heading: require('./components/heading.json')
    },
    filters: {
        json: data => JSON.stringify(data),
        split: (data, seperator) => data.split(seperator)
    }
});
```

Further documentation on the Config class can be found in the [rogain-config](https://github.com/krambuhl/rogain-config) module.


## Rogain.Parser

```js
var parser = new Rogain.Parser(config);
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

Further documentation can be found in the [rogain-parser](https://github.com/krambuhl/rogain-parser) module.


## Rendering

### Rogain.renderToString(tree, data, config)

```js
import tree from './components/template.json';
import data from './fixtures/data.json';

document.body.innerHTML = Rogain.renderToString(tree, data, config);
```

Further documentation can be found in the [rogain-render-string](https://github.com/krambuhl/rogain-render-string) module. 


## Utilities

Documentation can be found in the [rogain-utils](https://github.com/krambuhl/rogain-utils) module.

### createDefaultLocals(props, attrs)

```js
import { createDefaultLocals } from 'rogain-utils';
var locals = createDefaultLocals(props, attrs);
```

### createFrame(tree, locals)

```js
import { createDefaultLocals } from 'rogain-utils';
var frame = createFrame(rtree, locals);
```


## Tree Utilities

Documentation can be found in the [rogain-tree-utils](https://github.com/krambuhl/rogain-tree-utils)module.


### splitTree(trees, match)

```js
import { splitTree } from 'rogain-tree-utils';

var branches = splitTree(tree.children, {
    type: 'component',
    name: 'Else'
});

var passing = branches[0];
var failing = branches[1];
```


