const assert = require('assert');
const {circuitBreak}  = require('../index');

describe('Concurrency', function() {
  describe('#Promise.any()', function() {
    it('should return an array of value objects if there is no exception', async function(){
        let res = await Promise.any([Promise.resolve(1), Promise.resolve(2)]);
        assert.deepEqual(res,[{value:1},{value:2}]);
    });
    it('should return an array of error objects if there no exception', async function(){
        let res = await Promise.any([Promise.reject(1), Promise.reject(2)]);
        assert.deepEqual(res,[{error:1},{error:2}]);
    });
    it('should return an array mixed value and error objects', async function(){
        let res = await Promise.any([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]);
        assert.deepEqual(res,[{value:1},{error:2},{value:3}]);
    });
  });
  describe('#Promise.best()', function() {
    it('should return the first result', async function(){
        let res = await Promise.best([Promise.resolve(1), Promise.resolve(2)]);
        assert.deepEqual(res,1);
    });
    it('should return the first good result', async function(){
        let res = await Promise.best([Promise.reject(1), Promise.resolve(2), Promise.resolve(3)]);
        assert.deepEqual(res,2);
    });
    it('should return an exception with all error objects', async function(){
        try{
        let res = await Promise.best([Promise.reject(1), Promise.reject(2)]);
            assert.fail()
        }catch(e){
            assert.deepEqual(e,[1,2]);
        }
    });
  });
});
