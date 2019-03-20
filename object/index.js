Object.prototype.map = function(fn){ return Object.entries(this).reduce((acc,[k,v]) => ({...acc,[k]:fn(v,k)}),{}); };
Object.prototype.filter = function(fn){ return Object.entries(this).reduce((acc,[k,v]) => fn(v,k) && ({...acc,[k]:v}),{}) || acc; };
