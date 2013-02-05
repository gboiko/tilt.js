(function (parent) {
	parent.tilt = parent.titl || {};
	tilt = parent.tilt;

	var lastModuleIndx = 0;

	tilt.utils = {
		getNextModuleIndx : function () {
			return ++lastModuleIndx;
		},
		bind : function(fx,context) {
	        return function(){
	            return fx.apply(context,arguments);
	        }
	    },
		mixin : function (object) {
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

		}
	}

	tilt.sandbox = function (tilt) {

		var moduleIndx = 'module_' + tilt.utils.getNextModuleIndx();

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
			}
		}

	};

	
}(window));