const { either, fnOrValue, identity } = require('../logic');
const { curry } = require('../fp');

const parseOr = (parser, output = identity) => def =>
  either(data => {
    let res = parser(data);
    return output(res) ? res : res === 0 ? res : fnOrValue(def, data);
  }, def);

const jsonOr = parseOr(JSON.parse);
const floatOr = parseOr(parseFloat);
const intOr = parseOr(parseInt);

const setPrecision = curry((value, num) => +num.toFixed(value));

module.exports = { parseOr, jsonOr, floatOr, intOr, setPrecision };
