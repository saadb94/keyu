const assert = require('assert');
const {compose, pipe} = require('../fp');

const incrementBy = value => data => value + data;
const foldBy = value => data => value * data;
const rest = value => data => Promise.resolve(data - value);

describe('FP', function() {
  describe('#compose()', function() {
    it('should return a composed function of right to left', function(){
        let calc = compose(foldBy(2), incrementBy(1));
        assert.equal(calc(1),4);
    });
    it('should return a composed function that works with promises', async function(){
        let calc = compose(foldBy(2), rest(1), incrementBy(2));
        assert.equal(await calc(1),4);
    });
  });
  describe('#pipe()', function() {
    it('should return a composed function from left to right', function(){
        let calc = pipe(foldBy(2), incrementBy(1));
        assert.equal(calc(1),3);
    });
    it('should return a composed function that works with promises', async function(){
        let calc = pipe(foldBy(2), rest(1), incrementBy(2));
        assert.equal(await calc(1),3);
    });
  });
});
