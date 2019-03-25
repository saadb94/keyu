Promise.any = promises => Promise.all(promises.map(promise => promise.then(value => ({ value })).catch(error => ({ error }))));

Promise.best = promises =>
  new Promise(function(resolve, reject) {
    let errors = [];
    promises.map(promise =>
      promise
        .then(data => resolve(data))
        .catch(err => {
          errors.push(err);
          if (errors.length === promises.length) {
            reject(errors);
          }
        })
    );
  });

const circuitBreak = ({ tries = 3, cooldown = 1000, _tries = 1, _time = 0 } = {}) => (fn, fail, breaker) => (...args) => {
  if (tries >= _tries) {
    try {
      return fn.apply(null, args);
    } catch (e) {
      _tries++;
      _time = new Date();
      return fail(e);
    }
  } else {
    if (new Date() - _time > cooldown) {
      _tries = 1;
    }
    breaker && breaker.apply(null, args);
  }
};

module.exports = { circuitBreak };
