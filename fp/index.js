const mixCompose = (chain, func) => (chain instanceof Promise || typeof chain.then === "function") ? chain.then(func) : func(chain);

const pipe = (...fn) => input => fn.reduce(mixCompose,input);
const compose = (...fn) => input => fn.reduceRight(mixCompose,input);

module.exports = {pipe, compose};
