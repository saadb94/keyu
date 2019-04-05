const assert = require('assert');
const { setPrecision, parseOr, jsonOr, intOr, floatOr } = require('../conversions');
const { identity } = require('../logic');

describe('Conversions', function() {
  describe('#jsonOr()', function() {
    it('should return default value if empty', function() {
      assert.equal(jsonOr(0)(null), 0);
      assert.equal(jsonOr(0)(''), 0);
      assert.equal(jsonOr(0)(), 0);
      assert.equal(jsonOr(1)(0), 0);
      assert.equal(jsonOr(0)('asdffsda'), 0);
      assert.deepEqual(jsonOr(0)('{a:b}'), 0);
    });
    it('should return empty object if empty object passed', function() {
      assert.deepEqual(jsonOr(0)('{}'), {});
      assert.deepEqual(jsonOr(0)('{"a":{"b":1}}'), { a: { b: 1 } });
    });
    it('should return function returned value if passed a function', function() {
      assert.equal(jsonOr(x => 3)(null), 3);
    });
    it('should return same value if identity is passed as default value', function() {
      assert.equal(jsonOr(identity)(null), null);
    });
  });
  describe('#floatOr()', function() {
    it('should return default value if empty', function() {
      assert.equal(floatOr(0)(null), 0);
      assert.equal(floatOr(0)(), 0);
      assert.equal(floatOr(0)('xxxx'), 0);
      assert.equal(floatOr(0)('x3x'), 0);
      assert.equal(floatOr(1)(0), 0);
    });
    it('should return value if is a float', function() {
      assert.equal(floatOr(0)(1.1), 1.1);
      assert.equal(floatOr(0)('1.1'), 1.1);
      assert.equal(floatOr(0)('1.123456789'), 1.123456789);
    });
    it('should return function returned value if passed a function', function() {
      assert.equal(floatOr(x => 3)(null), 3);
    });
    it('should return same value if identity is passed as default value', function() {
      assert.equal(floatOr(identity)(null), null);
    });
  });
  describe('#intOr()', function() {
    it('should return default value if empty', function() {
      assert.equal(intOr(0)(null), 0);
      assert.equal(intOr(0)(), 0);
      assert.equal(intOr(0)('xxxx'), 0);
      assert.equal(intOr(0)('x3x'), 0);
      assert.equal(intOr(1)(0), 0);
    });
    it('should return value if is a int', function() {
      assert.equal(intOr(0)(1), 1);
      assert.equal(intOr(0)('1'), 1);
    });
    it('should return an int if passed a float', function() {
      assert.equal(intOr(0)(1.1), 1);
      assert.equal(intOr(0)('1.9'), 1);
    });
    it('should return function returned value if passed a function', function() {
      assert.equal(intOr(x => 3)(null), 3);
    });
    it('should return same value if identity is passed as default value', function() {
      assert.equal(intOr(identity)(null), null);
    });
  });
  describe('#setPrecision()', function() {
    it('should return with no decimals if 0 passed', function() {
      assert.equal(setPrecision(0, 1.3), 1);
    });
    it('should return with no decimals if wrong precision passed', function() {
      assert.equal(setPrecision(null, 1.3), 1);
      assert.equal(setPrecision(undefined, 1.3), 1);
    });
    it('should return the exact decimals passed', function() {
      assert.equal(setPrecision(2, 1.12345), 1.12);
    });
    it('should return decimals rounded', function() {
      assert.equal(setPrecision(3, 1.12345), 1.123);
      assert.equal(setPrecision(4, 1.12345), 1.1235);
    });
  });
  describe('#parseOr()', function() {
    it('should return default value if parser throws an exception', function() {
      assert.equal(
        parseOr(x => {
          throw Error('whatever');
        })(33)(1),
        33
      );
    });
    it('should return value if identity passes as a parser', function() {
      assert.equal(parseOr(identity)(33)(1), 1);
      assert.equal(parseOr(identity)(33)(0), 0);
    });
  });
});
