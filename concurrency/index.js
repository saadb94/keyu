const { either } = require('../logic');

Promise.any = promises => Promise.all(promises.map(promise => promise.then(value => ({ value })).catch(error => ({ error }))));

Promise.best = promises =>
  new Promise(function(resolve, reject, errors = []) {
    promises.map(promise =>
      promise.then(resolve).catch(err => {
        errors.push(err);
        if (errors.length === promises.length) {
          reject(errors);
        }
      })
    );
  });

const circuitBreak = ({ tries = 3, cooldown = 1000, _tries = 1, _time = 0 } = {}) => (fn, fail, breaker) => (...args) => {
  if (tries >= _tries) {
    return either(fn, err => {
      _tries++;
      _time = new Date();
      return fail(err);
    })(...args);
  } else {
    if (new Date() - _time > cooldown) {
      _tries = 1;
    }
    breaker && breaker(...args);
  }
};

module.exports = { circuitBreak };
