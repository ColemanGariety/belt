var _ = function() {}

_.prototype = {
  each: function(collection, iterator) {
    if (Array.isArray(collection)) {
      var i = collection.length
      while (i--) {
        iterator(collection[i])
      }
    } else {
      for (var prop in collection) {
        iterator(collection.prop)
      }
    }
  },
  
  indexOf: function(array, value) {
    if (Array.indexOf) {
      return array.indexOf(value)
    } else {
      for (var i = 0; i < array.length; i++) if (array[i] == value) return i
      return -1
    }
  },
  
  filter: function(collection, iterator) {
    if (Array.isArray(collection)) {
      var newCollection = new Array()
      for (var i = 0; i < collection.length; i++) iterator(collection[i]) && newCollection.push(collection[i])
    } else {
      var newCollection = new Object()
      for (var i in collection) if (iterator(collection[i])) newCollection[i] = collection[i]
    }
      
    return newCollection
  },
  
  reject: function(collection, iterator) {
    var newArray = new Array()
  
    if (Array.isArray(collection)) {
      var newCollection = new Array()
      for (var i = 0; i < collection.length; i++) !iterator(collection[i]) && newCollection.push(collection[i])
    } else {
      var newCollection = new Object()
      for (var i in collection) if (!iterator(collection[i])) newCollection[i] = collection[i]
    }
      
    return newCollection
  },
  
  uniq: function(array) {
    var newArray = new Array()
    for (var i = 0; i < array.length; i++) (indexOf(newArray, array[i]) == -1)  && newArray.push(array[i])
    return newArray
  },
  
  map: function(collection, iterator) {
    if (Array.isArray(collection)) {
      var newCollection = new Array()
      for (var i = 0; i < collection.length; i++) newCollection.push(iterator(collection[i]))
    } else {
      var newCollection = new Object()
      for (var i in collection) newCollection[i] = iterator(collection[i])
    }
      
    return newCollection
  },
  
  invoke: function(collection, methodName) {
    return map(collection, function(value) {
      return (typeof methodName == 'function' ? methodName : value[methodName]).apply(value)
    })
  },
  
  typeOf: function(object) {
    if (object instanceof Array) { return 'array' }
    else if (object == null) { return 'null' }
    else { return typeof object }
  },
  
  contains: function(obj, target) {
    if (obj == null) return false
    if (_.indexOf && obj.indexOf === _.indexOf) return obj.indexOf(target) != -1
    return _.any(obj, function(value) {
      return value === target
    })
  },
  
  any: function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (Array.prototype.some && obj.some === Array.prototype.some) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  },
  
  min: function(list, iterator, context) {
    if (!iterator && typeOf(list) == 'array') return Math.min.apply(Math, list)
    
    var result = { computed : Infinity, value: Infinity }
    
    each(list, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value
      computed < result.computed && (result = { value : value, computed : computed })
    })
    
    return result.value;
  },
  
  without: function(array, values) {
    rest = Array.prototype.concat.call(Array.prototype, Array.prototype.slice.call(arguments, 1))
    return _.filter(array, function(value) { return !_.contains(rest, value) })
  }
}

_ = new _()