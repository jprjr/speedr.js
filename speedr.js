// Generated by CoffeeScript 1.3.1
var BaseMap, isArray, isObject, speedr, toArrayPairs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

speedr = {};

isArray = Array.isArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

isObject = function(obj) {
  if (isArray(obj)) {
    return false;
  }
  return obj === Object(obj);
};

toArrayPairs = function(obj) {
  var k, tempItems, v;
  tempItems = [];
  for (k in obj) {
    v = obj[k];
    tempItems[tempItems.length] = [k, v];
  }
  return tempItems;
};

speedr.binarySearch = function(arr, val, exactMatch) {
  var h, l, m;
  if (exactMatch == null) {
    exactMatch = false;
  }
  h = arr.length;
  l = -1;
  while (h - l > 1) {
    if (arr[m = (h + l) >> 1] > val) {
      l = m;
    } else {
      h = m;
    }
  }
  if (exactMatch) {
    if (arr[h] === val) {
      return h;
    } else {
      return -1;
    }
  } else {
    return h;
  }
};

BaseMap = (function() {

  BaseMap.name = 'BaseMap';

  function BaseMap() {}

  BaseMap.prototype.updateLength = function() {
    this.length = this.keys.length;
    return this.length;
  };

  BaseMap.prototype.each = function(f) {
    var i, k, v, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      k = this.iterK(i);
      v = this.iterV(i);
      f(k, v);
    }
    return null;
  };

  BaseMap.prototype.eachKey = function(f) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      f(this.iterK(i));
    }
    return null;
  };

  BaseMap.prototype.eachVal = function(f) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      f(this.iterV(i));
    }
    return null;
  };

  return BaseMap;

})();

speedr.Map = (function(_super) {

  __extends(Map, _super);

  Map.name = 'Map';

  function Map() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.keys = [];
    this.revKeys = {};
    this.items = {};
    this.set.apply(this, items);
    this.updateLength();
  }

  Map.prototype.get = function(key) {
    if (!(key != null)) {
      return null;
    }
    return this.items[key];
  };

  Map.prototype.set = function() {
    var item, items, key, val, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items != null)) {
      return this.length;
    }
    if (isObject(items[0])) {
      items = toArrayPairs(items[0]);
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted set of invalid item.';
      }
      key = item[0];
      val = item[1];
      if (!(this.items[key] != null)) {
        this.revKeys[key] = this.keys.length;
        this.keys[this.keys.length] = key;
      }
      this.items[key] = val;
    }
    return this.updateLength();
  };

  Map.prototype.remove = function(key) {
    if (!(key != null)) {
      return this.length;
    }
    if (this.items[key] != null) {
      delete this.items[key];
      this.keys.splice(this.revKeys[key], 1);
      delete this.revKeys[key];
    }
    return this.updateLength();
  };

  Map.prototype.iter = function(counter) {
    return [this.keys[counter], this.items[this.keys[counter]]];
  };

  Map.prototype.iterK = function(counter) {
    return this.keys[counter];
  };

  Map.prototype.iterV = function(counter) {
    return this.items[this.keys[counter]];
  };

  Map.prototype.hasKey = function(key) {
    return this.items[key] != null;
  };

  Map.prototype.hasVal = function(val) {
    var i, result, _i, _ref;
    result = false;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (val === this.iterV(i)) {
        result = true;
        break;
      }
    }
    return result;
  };

  Map.prototype.clear = function() {
    this.items = {};
    this.revKeys = {};
    this.keys = [];
    this.updateLength();
    return null;
  };

  return Map;

})(BaseMap);

speedr.MultiMap = (function(_super) {

  __extends(MultiMap, _super);

  MultiMap.name = 'MultiMap';

  function MultiMap() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  }

  return MultiMap;

})(speedr.Map);

speedr.SortedMap = (function(_super) {

  __extends(SortedMap, _super);

  SortedMap.name = 'SortedMap';

  function SortedMap() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.keys = [];
    this.vals = [];
    this.set.apply(this, items);
    this.updateLength();
  }

  SortedMap.prototype.get = function(key) {
    var i;
    if (!(key != null)) {
      return null;
    }
    i = speedr.binarySearch(this.keys, key, true);
    if (i === -1) {
      return null;
    }
    return this.vals[i];
  };

  SortedMap.prototype.set = function() {
    var i, item, items, key, val, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items != null)) {
      return this.length;
    }
    if (isObject(items[0])) {
      items = toArrayPairs(items[0]);
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted set of invalid item.';
      }
      key = item[0];
      val = item[1];
      i = speedr.binarySearch(this.keys, key);
      if (this.keys[i] === key) {
        this.vals[i] = val;
      } else {
        this.keys.splice(i, 0, key);
        this.vals.splice(i, 0, val);
      }
    }
    return this.updateLength();
  };

  SortedMap.prototype.remove = function(key) {
    var i;
    if (!(key != null)) {
      return this.length;
    }
    i = speedr.binarySearch(this.keys, key);
    this.keys.splice(i, 1);
    this.vals.splice(i, 1);
    return this.updateLength();
  };

  SortedMap.prototype.pop = function() {
    this.keys.pop();
    this.vals.pop();
    return this.updateLength();
  };

  SortedMap.prototype.iter = function(counter) {
    return [this.keys[this.length - 1 - counter], this.vals[this.length - 1 - counter]];
  };

  SortedMap.prototype.iterK = function(counter) {
    return this.keys[this.length - 1 - counter];
  };

  SortedMap.prototype.iterV = function(counter) {
    return this.vals[this.length - 1 - counter];
  };

  SortedMap.prototype.hasKey = function(key) {
    if (speedr.binarySearch(this.keys, key, true) === -1) {
      return false;
    } else {
      return true;
    }
  };

  SortedMap.prototype.hasVal = function(val) {
    if (speedr.binarySearch(this.vals, val, true) === -1) {
      return false;
    } else {
      return true;
    }
  };

  SortedMap.prototype.clear = function() {
    this.keys = [];
    this.vals = [];
    this.updateLength();
    return null;
  };

  return SortedMap;

})(BaseMap);

speedr.SortedMultiMap = (function(_super) {

  __extends(SortedMultiMap, _super);

  SortedMultiMap.name = 'SortedMultiMap';

  function SortedMultiMap() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.keys = [];
    this.vals = [];
    this.set.apply(this, items);
    this.updateLength();
  }

  SortedMultiMap.prototype.set = function() {
    var i, item, items, key, val, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items != null)) {
      return this.length;
    }
    if (isObject(items[0])) {
      items = toArrayPairs(items[0]);
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted set of invalid item.';
      }
      key = item[0];
      val = item[1];
      i = speedr.binarySearch(this.keys, key);
      this.keys.splice(i, 0, key);
      this.vals.splice(i, 0, val);
    }
    return this.updateLength();
  };

  SortedMultiMap.prototype.remove = function(key, val) {
    var i, j;
    if (!(key != null)) {
      return this.length;
    }
    i = speedr.binarySearch(this.keys, key);
    if (val != null) {
      j = i - 1;
      while (true) {
        if (val === this.vals[i]) {
          break;
        }
        if (val === this.vals[j]) {
          i = j;
          break;
        }
        i++;
        j--;
      }
    }
    this.keys.splice(i, 1);
    this.vals.splice(i, 1);
    return this.updateLength();
  };

  return SortedMultiMap;

})(speedr.SortedMap);

if ((typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null)) {
  module.exports = speedr;
} else {
  window.speedr = speedr;
}
