export class Config {
  constructor(opts) {
    opts = opts || {};
    this.components = Object.assign({}, opts.components);
    this.helpers = Object.assign({}, opts.helpers);
  }

  registerComponent(name, tree) {
    this.components[name] = tree;
    return this;
  }

  unregisterComponent(name) {
    delete this.components[name];
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