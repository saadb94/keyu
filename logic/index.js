const either = (fn, fa) => (...arg) => {
  try {
    return fn.apply(null, arg);
  } catch (e) {
    return typeof fa === 'function' ? fa(e) : fa;
  }
};

const fnOrValue = (fnOrVal, data) => (typeof fnOrVal === 'function' ? fnOrVal(data) : fnOrVal);

module.exports = { either, fnOrValue };
