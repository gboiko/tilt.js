(function (tilt) {

	var views = {};


	tilt.View = {
		create: function (name,data) {
			views[name] = doT.template(data);
			return views[name];
		},
		getView: function (name) {
			return views[name];
		},
		render: function (name,context) {
			return views[name](context);
		}
	};

	return tilt;

}(window.tilt));
