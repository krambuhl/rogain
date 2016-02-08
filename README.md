# Rogain

Rogain is a templating library that parses HTML-like templates into JSON compatible trees and provides tools for rendering on the server and browser.


## Templates

Rogain provides a templating language that uses case-sensitive HTML and single curly brackets, block helpers and component composition.

```html
<div>
  <Heading tagName="h1">{title}</Heading>
  <Each data={favoriteThings} as="@thing">
    <Heading tagName="h2">{@thing.title}</Heading>
    <p>{@thing.contents}</p>
  </Each>
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
    filters: require('./filters')
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

### renderToString(tree, data, config)

```js
import tree from './components/template.json';
import data from './fixtures/data.json';

document.body.innerHTML = Rogain.renderToString(tree, data, config);
```

Further documentation can be found in the [rogain-render-string](https://github.com/krambuhl/rogain-render-string) module. 


## Utilities

Documentation can be found in the [rogain-utils](https://github.com/krambuhl/rogain-utils) module.


## Tree Utilities

Documentation can be found in the [rogain-tree-utils](https://github.com/krambuhl/rogain-tree-utils) module.

