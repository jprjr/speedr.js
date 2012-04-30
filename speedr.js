// Generated by CoffeeScript 1.3.1
var binarySearch, equals, flexiSlice, getKeys, speedr,
  __slice = [].slice;

speedr = {};

getKeys = Object.keys || function(obj) {
  var k, keys;
  if (obj !== Object(obj)) {
    throw new Error('No keys for non-object');
  }
  keys = [];
  for (k in obj) {
    if (hasOwnProperty.call(obj, k)) {
      keys[keys.length] = k;
    }
  }
  return keys;
};

binarySearch = function(arr, val, exactOnly) {
  var h, l, m;
  if (exactOnly == null) {
    exactOnly = false;
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
  if (exactOnly) {
    if (arr[h] === val) {
      return h;
    } else {
      return -1;
    }
  } else {
    return h;
  }
};

equals = function(a, b) {
  var i, v, _i, _len;
  if (typeOf(a) !== typeOf(b)) {
    return false;
  }
  if (typeOf(a) === 'array') {
    if (a.length !== b.length) {
      return false;
    }
    for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
      v = a[i];
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
  } else if (typeOf(a) === 'object') {
    if (Object.getLength(a) !== Object.getLength(b)) {
      return false;
    }
    for (i in a) {
      v = a[i];
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
  } else {
    return a === b;
  }
  return true;
};

flexiSlice = function(obj, start, end) {
  var i, temp, _i;
  if (typeOf(obj) === 'array') {
    temp = [];
  } else {
    temp = '';
  }
  if (!(end != null)) {
    if (start >= 0) {
      end = obj.length;
    } else {
      end = -obj.length - 1;
    }
  }
  if (end > obj.length) {
    end = obj.length;
  }
  if (end < -obj.length) {
    end = -obj.length - 1;
  }
  if (start > obj.length) {
    start = obj.length - 1;
  }
  if (start < -obj.length) {
    start = -obj.length;
  }
  for (i = _i = start; start <= end ? _i < end : _i > end; i = start <= end ? ++_i : --_i) {
    if (typeOf(obj) === 'array') {
      if (i >= 0) {
        temp.push(obj[i]);
      } else {
        temp.push(obj[obj.length + i]);
      }
    } else {
      if (i >= 0) {
        temp += obj[i];
      } else {
        temp += obj[obj.length + i];
      }
    }
  }
  return temp;
};

speedr.Table = (function() {

  Table.name = 'Table';

  function Table(items) {
    this.items = items != null ? items : {};
    if (!this instanceof arguments.callee) {
      throw new Error('Constructor called as a function.  \nUse \'new\' for instantiating classes.');
    }
    if (typeOf(this.items) !== 'object') {
      throw 'Table requires an object for construction.';
    }
    this.keys = Object.keys(this.items);
    this.length = this.keys.length;
  }

  Table.prototype.get_length = function() {
    return this.keys.length;
  };

  Table.prototype.set_length = function() {};

  Table.prototype.get = function(key) {
    return this.items[key];
  };

  Table.prototype.set = function() {
    var i, key, obj, others, pushPair, val, _i, _ref,
      _this = this;
    obj = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    pushPair = function(key, val) {
      if (!(_this.items[key] != null)) {
        _this.keys.push(key);
      }
      return _this.items[key] = val;
    };
    if (others.length === 0) {
      for (key in obj) {
        val = obj[key];
        pushPair(key, val);
      }
    } else {
      pushPair(obj, others[0]);
      for (i = _i = 1, _ref = others.length; _i < _ref; i = _i += 2) {
        pushPair(others[i], others[i + 1]);
      }
    }
    return this.items;
  };

  Table.prototype.remove = function(key) {
    if (this.items[key] != null) {
      delete this.items[key];
      Array.remove(this.keys, key);
    }
    return this.items;
  };

  Table.prototype.iter = function(counter) {
    return [this.keys[counter], this.items[this.keys[counter]]];
  };

  Table.prototype.iterK = function(counter) {
    return this.keys[counter];
  };

  Table.prototype.iterV = function(counter) {
    return this.items[this.keys[counter]];
  };

  Table.prototype.hasKey = function(key) {
    return this.items[key] != null;
  };

  Table.prototype.hasVal = function(val) {
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

  Table.prototype.clear = function() {
    this.items = {};
    return this.keys = [];
  };

  return Table;

})();

speedr.SortedTable = (function() {

  SortedTable.name = 'SortedTable';

  function SortedTable() {
    this.keys = [];
    this.vals = [];
    this.length = 0;
  }

  SortedTable.prototype.insert = function(key, val) {
    var i;
    i = binarySearch(this.keys, key);
    this.keys.splice(i, 0, key);
    return this.vals.splice(i, 0, val);
  };

  SortedTable.prototype.remove = function(key, val) {
    var i, j;
    if (!(key != null)) {
      return;
    }
    i = binarySearch(this.keys, key);
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
    return this.vals.splice(i, 1);
  };

  SortedTable.prototype.pop = function() {
    this.keys.pop();
    return this.vals.pop();
  };

  SortedTable.prototype.iter = function(counter) {
    return [this.keys[this.length - 1 - counter], this.vals[this.length - 1 - counter]];
  };

  SortedTable.prototype.iterK = function(counter) {
    return this.keys[this.length - 1 - counter];
  };

  SortedTable.prototype.iterV = function(counter) {
    return this.vals[this.length - 1 - counter];
  };

  return SortedTable;

})();
