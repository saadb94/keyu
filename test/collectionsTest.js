/* global it describe */
const assert = require('assert');
const { map, filter, reduce } = require('../collections');

const incrementBy = value => data => value + data;
const identity = x => x;
const greaterThan = x => data => data > x;
const get = key => data => data[key];

describe('Collections', function() {
  describe('#reduce()', function() {
    it('should return the sumation of its keys', function() {
      let a = { a: 1, b: 2 };
      let b = [1, 2];
      let sum = (a, b) => a + b;

      assert.strictEqual(reduce(sum, 0, a), 3);
      assert.strictEqual(reduce(sum, 0)(b), 3);
    });
  });
  describe('#map()', function() {
    it('should return same object given identity', function() {
      let a = { a: 1, b: 2 };
      let b = [1, 2];
      assert.deepStrictEqual(map(identity, a), a);
      assert.deepStrictEqual(map(identity, b), b);
    });
    it('should return incrementBy(1) all properties', function() {
      let a = { a: 1, b: 2 };
      let b = [1, 2];
      assert.deepStrictEqual(map(incrementBy(1), a), { a: 2, b: 3 });
      assert.deepStrictEqual(map(incrementBy(1), b), [2, 3]);
    });
    it('should return the first level', function() {
      let a = { a: { b: 1 }, b: { b: 2 } };
      let b = [[1], [2]];
      assert.deepStrictEqual(map(get('b'), a), { a: 1, b: 2 });
      assert.deepStrictEqual(map(get(0), b), [1, 2]);
    });
    it('should return empty object if empty object', function() {
      let a = {};
      let b = [];
      assert.deepStrictEqual(map(incrementBy(1), a), {});
      assert.deepStrictEqual(map(incrementBy(1), b), []);
    });
  });
  describe('#filter()', function() {
    it('should return same object given identity', function() {
      let a = { a: 1, b: 2 };
      let b = [1, 2];
      assert.deepStrictEqual(filter(identity, a), a);
      assert.deepStrictEqual(filter(identity, b), b);
    });
    it('should return only properties greaterThan(1)', function() {
      let a = { a: 1, b: 2 };
      let b = [1, 2];
      assert.deepStrictEqual(filter(greaterThan(1), a), { b: 2 });
      assert.deepStrictEqual(filter(greaterThan(1), b), [2]);
    });
    it('should return only properties greaterThan(0)', function() {
      let a = { a: 1, b: 2 };
      let b = [1, 2];
      assert.deepStrictEqual(filter(greaterThan(0), a), a);
      assert.deepStrictEqual(filter(greaterThan(0), b), b);
    });
    it('should return empty object if no match', function() {
      let a = { a: 1, b: 2 };
      let b = [1, 2];
      assert.deepStrictEqual(filter(greaterThan(5), a), {});
      assert.deepStrictEqual(filter(greaterThan(5), b), []);
    });
  });
});
