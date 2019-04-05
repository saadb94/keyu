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

module.exports = {};
