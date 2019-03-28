# Keyu

[![Build Status](https://travis-ci.org/nerac/keyu.svg?branch=master)](https://travis-ci.org/nerac/keyu)
[![install size](https://packagephobia.now.sh/badge?p=keyu)](https://packagephobia.now.sh/result?p=keyu)
[![Known Vulnerabilities](https://snyk.io/test/npm/keyu/badge.svg)](https://snyk.io/test/npm/keyu)

[![NPM](https://nodei.co/npm/keyu.png)](https://nodei.co/npm/keyu/)

**Key u**tilities you will need for any complex javascript project.

## Utilities

### Functional programming

#### Compose

Composes N functions into another one, also accept functions that a return Promise.

```
const {compose} = require('keyu');

const sum1 = x => x+1;
const mult2 = x => x*2;
const dbSum = x => Promise.resolve(x+1);

const sumAndMult = compose(mult2,sum1);
const sumAndMultDB = compose(dbSum,mult2,sum1);

sumAndMult(1) // 4
sumAndMultDB(1) // Promise(5)
```
#### Pipe

Pipe N functions into another one, also accept functions that a return Promise.

```
const {pipe} = require('keyu');

const sum1 = x => x+1;
const mult2 = x => x*2;
const dbSum = x => Promise.resolve(x+1);

const sumAndMult = pipe(sum1,mult2);
const sumAndMultDB = pipe(sum1, mult2, dbSum);

sumAndMult(1) // 4
sumAndMultDB(1) // Promise(5)
```

### Objects

#### Map

Maps over every key of an object
```
let obj = {a:1,b:2,c:3};

console.log(obj.map(value => value+1)) // {a:2}
console.log(obj.map((value, key) => `${key}:${value+1}`)) // {a:'a:2'}
```

functional programmming implementation:
```
const {map,compose} = require('keyu');

const sum1 = compose(map(x => x+1))

sum1([1]) // [2]
sum1({a:1}) // {a:2}
```

#### Filter

Filters an object for each single key
```
let obj = {a:1,b:2,c:3};

console.log(obj.filter(value => value > 2)) // {c:3}

console.log(obj.filter((value, key) => value > 1 && key === 'c')) // {c:3}
```

functional programmming implementation:

```
const {filter,compose} = require('keyu');

const greaterThan5 = compose(filter(x => x > 5 ))

greaterThan5([1,2,3,4,5,6,7,8]) // [6,7,8]
greaterThan5({a:1,b:2,c:3,d:4,e:5,f:6,g:7}) // {f:6,g:7}
```

### Concurrency

#### Any

Promise.all follows a fail-fast pattern meaning that if one single promise fails it stops returning the failure.
This implements Promise.any which will return the result of all promises independenly if they fail or not.

```
Promise.any([Promise.resolve(1),Promise.reject(2), Promise.resolve(3)]).then(console.log) // [ { value: 1 }, { error: 2 }, { value: 3 } ]
```
