exports.each = function each(iterator) {
  if (Array.isArray(this)) {
    var i = this.length
    while (i--) {
      iterator(this[i])
    }
  } else {
    for (var prop in this) {
      iterator(this.prop)
    }
  }
}

exports.indexOf = function indexOf(value) {
  if (Array.indexOf) {
    return this.indexOf(value)
  } else {
    for (var i = 0; i < this.length; i++) if (this[i] == value) return i
    return -1
  }
}

exports.filter = function filter(iterator) {
  if (Array.isArray(this)) {
    var collection = new Array()
    for (var i = 0; i < this.length; i++) iterator(this[i]) && collection.push(this[i])
  } else {
    var collection = new Object()
    for (var i in this) if (iterator(this[i])) collection[i] = this[i]
  }
    
  return collection
}

exports.reject = function reject(iterator) {
  var newArray = new Array()

  if (Array.isArray(this)) {
    var collection = new Array()
    for (var i = 0; i < this.length; i++) !iterator(this[i]) && collection.push(this[i])
  } else {
    var collection = new Object()
    for (var i in this) if (!iterator(this[i])) collection[i] = this[i]
  }
    
  return collection
}

exports.uniq = function uniq(array) {
  var newArray = new Array()
  for (var i = 0; i < array.length; i++) (indexOf(newArray, array[i]) == -1)  && newArray.push(array[i])
  return newArray
}

exports.map = function map(iterator) {
  if (Array.isArray(this)) {
    var collection = new Array()
    for (var i = 0; i < this.length; i++) collection.push(iterator(this[i]))
  } else {
    var collection = new Object()
    for (var i in this) collection[i] = iterator(this[i])
  }
    
  return collection
}

exports.invoke = function invoke(methodName) {
  return map(this, function(value) {
    return (typeof methodName == 'function' ? methodName : value[methodName]).apply(value)
  })
}

exports.typeOf = function typeOf(object) {
  if (object instanceof Array) { return 'array' }
  else if (object == null) { return 'null' }
  else { return typeof object }
}

exports.contains = function contains(obj, target) {
  if (obj == null) return false
  if (_.indexOf && obj.indexOf === _.indexOf) return obj.indexOf(target) != -1
  return _.any(obj, function(value) {
    return value === target
  })
}

exports.any = function any(obj, iterator, context) {
  iterator || (iterator = _.identity)
  var result = false
  if (obj == null) return result
  if (Array.prototype.some && obj.some === Array.prototype.some) return obj.some(iterator, context)
  each(obj, function(value, index, list) {
    if (result || (result = iterator.call(context, value, index, list))) return breaker
  });
  return !!result
}

exports.min = function min(list, iterator, context) {
  if (!iterator && typeOf(list) == 'array') return Math.min.apply(Math, list)
  
  var result = { computed : Infinity, value: Infinity }
  
  each(list, function(value, index, list) {
    var computed = iterator ? iterator.call(context, value, index, list) : value
    computed < result.computed && (result = { value : value, computed : computed })
  })
  
  return result.value;
}

exports.without = function without(array, values) {
  rest = Array.prototype.concat.call(Array.prototype, Array.prototype.slice.call(arguments, 1))
  return _.filter(array, function(value) { return !_.contains(rest, value) })
}