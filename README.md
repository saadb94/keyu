# Keyu

Key utilities you will need when you work in any javascript project.

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

#### Filter

Filters an object for each single key
```
let obj = {a:1,b:2,c:3};

console.log(obj.filter(value => value > 2)) // {c:3}

console.log(obj.filter((value, key) => value > 1 && key === 'c')) // {c:3}
```

