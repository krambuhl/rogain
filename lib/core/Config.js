export class Config {
  constructor(opts) {
    var options = opts || {};
    
    this.components = Object.assign({}, options.components);
    this.helpers = Object.assign({}, options.helpers);
    this.filters = Object.assign({}, options.filters);
  }

  // components
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

  // helpers
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

  // filters
  registerFilters(filters) {
    for(var name in filters)
      this.registerFilter(name, filters[name]);
    return this;
  }

  registerFilter(name, helper) {
    this.filters[name] = helper;
    return this;
  }

  unregisterFilter(name) {
    delete this.filters[name];
    return this;
  }
}