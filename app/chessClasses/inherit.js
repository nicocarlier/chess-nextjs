export const inherit = function(parent,child){
    function Surrogate(){};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
};

// module.exports = inherit;