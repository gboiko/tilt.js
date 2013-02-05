Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.prototype.methods = function (methods) {
    for (var name in methods) {
        this.method(name,methods[name])
    }
}

Function.method('extend', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method('super', function _super(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

Function.method('addons', function (parent) {
    for (var i = 1; i < arguments.length; i += 1) {
        var name = arguments[i];
        this.prototype[name] = parent.prototype[name];
    }
    return this;
});


Class = function (name, prop) {
    
    var prop = prop || {},
        initialize = prop.init || false,
        extend = prop.extend || false,
        fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    if (initialize) 
        delete prop.init;

    if (extend)
        delete prop.extend;

    function Class () {
        if (initialize)
            initialize.apply(this, arguments);
    }

    Class.prototype = prop;

    if (extend) {
        var parent_prop = extend.prototype;
        for (var name in parent_prop) {
            if (!prop[name]) 
                prop[name] = parent_prop[name]
      }
    }
    
    return Class;
}

