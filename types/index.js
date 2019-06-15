/** @module types */

/** Checks **correctly** if the passed type is or not a **number**
 * @argument {*} num any possible data type
 * @returns {boolean} indicating if is a number or not
 * @example
 * isNumber(null) // -> false note isNaN(null) will return false instead
 * @see [typesTest.js](https://github.com/nerac/keyu/blob/master/test/typesTest.js)
 * @method
 */
const isNumber = num => !isNaN(num) && num !== null;

/** Checks **correctly** if the passed type is or not an **object**
 * @argument {*} num any possible data type
 * @returns {boolean} indicating if it's an object or not
 * @example
 * isObject(null) // -> false note that typeof will return true
 * isObject({}) // -> true
 * isObject(new Error()) // -> true
 * @see [typesTest.js](https://github.com/nerac/keyu/blob/master/test/typesTest.js)
 * @method
 */
const isObject = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

/** Checks if the passed type is a non defined value, either `undefined` or `null`
 * @argument {*} num any possible data type
 * @returns {boolean} indicating if it's an non defined
 * @example
 * isNil(null) // -> true
 * isNil(3) // -> false
 * isNil() // -> true
 * isNil(undefined) // -> true
 * @see [typesTest.js](https://github.com/nerac/keyu/blob/master/test/typesTest.js)
 * @method
 */
const isNil = value => typeof value === 'undefined' || value === null;

module.exports = { isNumber, isObject, isNil };
