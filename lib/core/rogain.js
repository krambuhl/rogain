export default class Rogain {
  constructor(opts) {
    this.components = Object.assign({}, opts.components);
    this.helpers = Object.assign({}, opts.helpers);
  }

  registerComponent(name, tree) {
    this.components[name] = tree;
  }

  unregisterComponent(name) {
    delete this.components[name];
  }

  registerHelper(name, helper) {
    this.helpers[name] = helper;
  }

  unregisterHelper(name) {
    delete this.helpers[name];
  }
}