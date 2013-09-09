function each(collection, iterator) {
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
}

function indexOf(array, value) {
  if (Array.indexOf) {
    return array.indexOf(value)
  } else {
    for (var i = 0; i < array.length; i++) if (array[i] == value) return i
    return -1
  }
}

function filter(collection, iterator) {
  if (Array.isArray(collection)) {
    var newCollection = new Array()
    for (var i = 0; i < collection.length; i++) iterator(collection[i]) && newCollection.push(collection[i])
  } else {
    var newCollection = new Object()
    for (var i in collection) if (iterator(collection[i])) newCollection[i] = collection[i]
  }
    
  return newCollection
}

function reject(collection, iterator) {
  var newArray = new Array()

  if (Array.isArray(collection)) {
    var newCollection = new Array()
    for (var i = 0; i < collection.length; i++) !iterator(collection[i]) && newCollection.push(collection[i])
  } else {
    var newCollection = new Object()
    for (var i in collection) if (!iterator(collection[i])) newCollection[i] = collection[i]
  }
    
  return newCollection
}

function uniq(array) {
  var newArray = new Array()
  for (var i = 0; i < array.length; i++) (indexOf(newArray, array[i]) == -1)  && newArray.push(array[i])
  return newArray
}

function map(collection, iterator) {
  if (Array.isArray(collection)) {
    var newCollection = new Array()
    for (var i = 0; i < collection.length; i++) newCollection.push(iterator(collection[i]))
  } else {
    var newCollection = new Object()
    for (var i in collection) newCollection[i] = iterator(collection[i])
  }
    
  return newCollection
}

function invoke(collection, methodName) {
  return map(collection, function(value) {
    return (typeof methodName == 'function' ? methodName : value[methodName]).apply(value)
  })
}

function typeOf(object) {
  if (object instanceof Array) { return 'array' }
  else if (object == null) { return 'null' }
  else { return typeof object }
}

function min(list, iterator, context) {
  if (!iterator && typeOf(list) == 'array') return Math.min.apply(Math, list)
  
  var result = { computed : Infinity, value: Infinity }
  
  each(list, function(value, index, list) {
    var computed = iterator ? iterator.call(context, value, index, list) : value
    computed < result.computed && (result = { value : value, computed : computed })
  })
  
  return result.value;
}