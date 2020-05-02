var Dictionary = function(){
  this.data = {};

  this.add = function(key, value){
    this.data[key] = value;
  };
  
  this.remove = function(key) {
    delete this.data[key];
  };
  
  this.contains = function(key){
    return key in this.data;
  };
  
  this.get = function(key) {
    return this.contains(key) ? this.data[key] : undefined;
  };
  
  this.clear = function() {
    for (var key in this.data) {
      delete this.data[key];
    }
  };
  
  this.size = function() {
    var n = 0;
    for (var key in this.data) {
      n++;
    }
    return n;
  };
  
  this.keys = function() {
    var keys = [];
    for (var key in this.data) {
      keys.push(key);
    }
    return keys;
  };
  
  this.values = function(){
    var values = [];
    for (var key in this.data) {
      if (this.contains(key)) {
        values.push(this.data[key]);
      }
    }
    return values;
  };
  
  this.viewAll = function() {
    for (var key in this.data) {
      console.log(key + " -> " + this.data[key]);
    }
  };
}

export default Dictionary;