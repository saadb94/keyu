const {curry} = require('../fp');

Object.prototype.map = function(fn){ return Object.entries(this).reduce((acc,[k,v]) => ({...acc,[k]:fn(v,k)}),{}); };
Object.prototype.filter = function(fn){ return Object.entries(this).reduce((acc,[k,v]) => fn(v,k) && ({...acc,[k]:v}),{}) || {}; };

const map = curry((fn, col) => col.map(fn));
const filter = curry((fn, col) => col.filter(fn));

module.exports = {map, filter};
