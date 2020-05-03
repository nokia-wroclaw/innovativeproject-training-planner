const Dictionary = function() {
  this.data = {};

  this.add = function(key, value) {
    this.data[key] = value;
  };

  this.remove = function(key) {
    delete this.data[key];
  };

  this.contains = function(key) {
    return key in this.data;
  };

  this.get = function(key) {
    return this.contains(key) ? this.data[key] : undefined;
  };

  this.clear = function() {
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        delete this.data[key];
      }
    }
  };

  this.size = function() {
    return Object.keys(this.data).length;
  };

  this.keys = function() {
    return Object.keys(this.data);
  };

  this.values = function() {
    const values = [];
    for (const key in this.data) {
      if (this.contains(key)) {
        values.push(this.data[key]);
      }
    }
    return values;
  };

  this.viewAll = function() {
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        console.log(key + ' -> ' + this.data[key]);
      }
    }
  };
};

export default Dictionary;
