const assert = require('assert');
const {either} = require('../logic');

describe('Logic', function() {
  describe('#either()', function() {
    it('should return the result of function if there is no exception', function(){
        let fn = either(JSON.parse,0);
        assert.deepEqual(fn('{"a":3}'),{a:3});
    });
    it('should return the default value if there is exception', function(){
        let fn = either(JSON.parse,0);
        assert.deepEqual(fn({}),0);
    });
    it('should return the default value from a function if there is exception', function(){
        let fn = either(JSON.parse,x => 0);
        assert.deepEqual(fn({}),0);
    });
  });
});
