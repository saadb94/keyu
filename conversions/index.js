const { either, fnOrValue } = require('../logic');
const { curry } = require('../fp');
const ZERO = 0;

const parseOr = curry((parser, def) =>
  either(data => {
    const res = parser(data);
    return res || (res === ZERO ? res : fnOrValue(def, data));
  }, def)
);

const jsonOr = parseOr(JSON.parse);
const floatOr = parseOr(parseFloat);
const intOr = parseOr(num => parseInt(`${num}`, 10));

const setPrecision = curry((value, num) => Number(num.toFixed(value)));

module.exports = { parseOr, jsonOr, floatOr, intOr, setPrecision };
