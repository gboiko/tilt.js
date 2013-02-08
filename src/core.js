(function (parent) {
	parent.tilt = parent.titl || {};
	tilt = parent.tilt;

	parent.tilt.version = 0.1;

	var lastModuleIndx = 0;

	tilt.utils = {};

	tilt.utils.getNextModuleIndx = function () {
		return ++lastModuleIndx;
	};	
		
	tilt.utils.bind = function(fx,context) {
        return function(){
            return fx.apply(context,arguments);
        }
    };
	
	tilt.utils.mixin = function (object) {
		var mixins = Array.prototype.slice.call(arguments, 1);
	    for (var i = 0; i < mixins.length; ++i)
	    {
	        for (var prop in mixins[i])
	        {
	            if (typeof object.prototype[prop] === "undefined")
	            {
	                bindMethod = function (mixin, prop)
	                {
	                    return function () { 
	                    	mixin[prop].apply(this, arguments) 
	                    }
	                }

	                object.prototype[prop] = bindMethod(mixins[i], prop);
	            }
	        }
	    }

	};
	
	 /**
     * alias for toSting function of object
     * @type {*}
     */
    tilt.utils.toString = Object.prototype.toString;

    /**
     * check fn input is Function
     * @param fn
     * @return {Boolean}
     */
    tilt.utils.isFunction = function (fn) {
        return toString.call(fn) === '[object Function]';
    };

    /**
     * check if arr is Array
     * @param arr
     * @return {Boolean}
     */
    tilt.utils.isArray = function (arr) {
        return toString.call(arr) === '[object Array]';
    };

    /**
     * check if obj is Object
     * @param obj
     * @return {Boolean}
     */
    tilt.utils.isObject = function (obj) {
        return toString.call(obj) === '[object Object]';
    };

    /**
     * check if str is String
     * @param str
     * @return {Boolean}
     */
    tilt.utils.isString = function (str) {
        return toString.call(str) == '[object String]';
    };

	tilt.sandbox = function (tilt,name) {

		var moduleIndx = 'module_' +name + '_' + tilt.utils.getNextModuleIndx();
		
		var klasses = {};

		var getClass = function (name) {
			if (klasses[name]) {
				return klasses[name];
			}
			return false;
		};

		var createClass = function (name,prop) {
			var instance = tilt.Class.extend(prop);
			klasses[name] = instance;
			return instance;		
		};

		return {
			on : function (name,cb) {
				tilt.on(name,moduleIndx,cb);
				return this;
			},
			off : function (name) {
				tilt.off(name,moduleIndx);
				return this;
			},
			emit : function (name,data) {
				tilt.emit(name,data);
				return this;
			},
			Class : function (name,prop) {
				if (prop.extend) {
					var instance = null,
						parent = null;
					parent = prop.extend;
					delete prop.extend;
					if (tilt.utils.isObject(parent)) {
						instance = parent.extend(prop);	
					} else if ( tilt.utils.isString(parent) ) {
						var parentClass = getClass(parent);
						if (!parentClass) {
							return createClass(name,prop);
						}
						instance = parentClass.extend(prop);
					} else {
						return createClass(name,prop);
					}
					klasses[name] = instance;
					return instance;
				} else {
					return createClass(name,prop);	
				}			
			},
			getClass : function (name) {
				return getClass(name);
			},
			lsStructure : function () {
				var source = {};
				source[moduleIndx] = {
					classes : this.lsClasses()			
				};
				return source;
			},
			lsClasses : function () {
				var list = [];
				for (var name in klasses) {
					list.push(name);
				}
				return list;
			}
		}
	};

	
}(window));