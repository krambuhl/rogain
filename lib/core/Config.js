export class Config {
  constructor(opts) {
    opts = opts || {};
    this.components = Object.assign({}, opts.components);
    this.helpers = Object.assign({}, opts.helpers);
  }

  registerComponents(components) {
    for(var name in components)
      this.registerComponent(name, components[name]);
    return this;
  }
 
  registerComponent(name, tree) {
    this.components[name] = tree;
    return this;
  }

  unregisterComponent(name) {
    delete this.components[name];
    return this;
  }

  registerHelpers(helpers) {
    for(var name in helpers)
      this.registerHelper(name, helpers[name]);
    return this;
  }

  registerHelper(name, helper) {
    this.helpers[name] = helper;
    return this;
  }

  unregisterHelper(name) {
    delete this.helpers[name];
    return this;
  }
}