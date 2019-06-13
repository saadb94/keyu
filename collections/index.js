const { curry } = require('../fp');

const reduce = curry((fn, def, collection) => {
  if (Array.isArray(collection)) {
    return collection.reduce(fn, def);
  }
  return Object.entries(collection).reduce((acc, [k, v]) => fn(acc, v, k), def);
});

const map = curry((fn, collection) => {
  if (Array.isArray(collection)) {
    return collection.map(fn);
  }
  return reduce((acc, v, k) => ({ ...acc, [k]: fn(v, k) }), {}, collection);
});

const filter = curry((fn, collection) => {
  if (Array.isArray(collection)) {
    return collection.filter(fn);
  }
  return reduce((acc, v, k) => (fn(v, k) && { ...acc, [k]: v }) || {}, {}, collection);
});

module.exports = { map, filter, reduce };
