Promise.any = (promises) => Promise.all(promises.map(promise => promise.then(value => ({value})).catch(error => ({error}))));
