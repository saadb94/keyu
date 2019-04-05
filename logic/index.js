const either = (fn, fa) => (...arg) => {
  try {
    return fn.apply(null, arg);
  } catch (e) {
    return typeof fa === 'function' ? fa(e) : fa;
  }
};

const fnOrValue = (fnOrVal, data) => (typeof fnOrVal === 'function' ? fnOrVal(data) : fnOrVal);
const identity = x => x;

module.exports = { either, fnOrValue, identity };
