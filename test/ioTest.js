/* global it describe */
const assert = require('assert');
const { identity } = require('../logic');
const { envOr } = require('../io');

describe('IO', function() {
  describe('#envOr()', function() {
    it('should return the enviroment var if passed', function() {
      const val = envOr('db', 'localhost', identity, { env: { DB: '127.0.0.1' } });
      assert(val, '127.0.0.1');
    });
    it('should return the failover value if no environment', function() {
      const val = envOr('db', 'localhost', identity, { env: null });
      const val1 = envOr('db', 'localhost', identity, {});
      const val2 = envOr('db', 'localhost');
      assert(val, 'localhost');
      assert(val1, 'localhost');
      assert(val2, 'localhost');
    });
    it('should return accept a function as failover', function() {
      const val = envOr('db', () => 33);
      assert(val, 33);
    });
    it('should return parsed value', function() {
      const val = envOr('db', 33, parseFloat, { env: { DB: '3.14' } });
      assert(val, 3.14);
    });
  });
});
