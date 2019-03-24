const either = (fn,fa) => (...arg) => { try{ return fn.apply(null,arg); }catch(e){ return typeof fa === "function" ? fa(e) : fa; } };

module.exports = {either};
