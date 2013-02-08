(function (tilt) {
	tilt.module = (function () {

		var register = {},
			modules = {};

		return {
			create : function (name,module) {
				register[name] = module;
				return this;
			},
			run : function (name) {
				if (name) return this.execute_one(name);
				return this.execute_all();
			},
			execute_one : function (name) {
				modules[name] = register[name](tilt.sandbox(tilt,name));
				delete register[name];
				return this;
			},
			execute_all : function () {
				for (var name in register) {
					this.execute_one(name);
				}
				return this;
			},
			get_modules : function () {
				return modules;
			},
			get_registered : function () {
				return register;
			}

		}
	}());
}(window.tilt))