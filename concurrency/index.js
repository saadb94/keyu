const { either } = require('../logic');
const { curry } = require('../fp');

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

const circuitBreak = ({ tries = 3, cooldown = 1000, _tries = 1, _time = 0 , _getTime = _ => new Date()} = {}) => curry((fn, fail, breaker, ...args) => {
  if (tries >= _tries) {
    return either(fn, err => {
      _tries++;
      _time = _getTime();
      return fail(err);
    })(...args);
  } else {
    if (_getTime() - _time > cooldown) {
      _tries = 1;
    }
    breaker && breaker(...args);
  }
});

module.exports = { circuitBreak };
