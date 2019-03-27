const { either, fnOrValue } = require('../logic');

const parseOr = (parser, output = x => x) => def =>
  either(data => {
    let res = parser(data);
    return output(res) ? res : fnOrValue(def, data);
  }, def);

const jsonOr = parseOr(JSON.parse);
const floatOr = parseOr(parseFloat);
const intOr = parseOr(parseInt);

const setPrecision = value => num => +num.toFixed(value);

module.exports = { parseOr, jsonOr, floatOr, intOr, setPrecision };
