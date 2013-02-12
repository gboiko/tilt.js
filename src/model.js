(function (tilt) {

	var models = {};

	var Model = tilt.Class.extend({
		init: function (modelName,modelStructure,initData) {
			this.currentIndx = 0;
			this.modelName = modelName;
			this.modelStructure = modelStructure;
			this.modelStructureObj = {};
			this.data = {};
			if (initData) {
				this.insert(initData);
			}
			var i = modelStructure.length; 
			while (i--) {
				this.modelStructureObj[modelStructure[i]] = i;
				(function (self,field) {
					var fieldCapitalzied = field.capitalize();
					self['get'+fieldCapitalzied] = function () {
						indx = self.getFieldIndx(field);
						return self.selectByFieldIndx(indx)
					};
				}(this,modelStructure[i]));
			}
		},
		getNextIndx: function () {
			return ++this.currentIndx;
		},
		insert: function (data) {
			this.data[this.getNextIndx()] = data;
			return this.data;
		},
		select: function (field,kind) {
			return this.data;
		},
		selectByFieldIndx: function (indx) {
			var _resData = {},
				currentData = this.data;
			for (var uid in currentData) {
				_resData[uid] = currentData[uid][indx]
			}
			return _resData;
		},
		find: function (query,limit) {
			var _resData = {},
				currentData = this.data,
				indx = this.getFieldIndx(query[0]),
				compareValue = query[1],
				counter = 0;
			for (var uid in currentData) {
				if (counter >= limit && limit) break;
				var value = currentData[uid][indx];
				if (value == compareValue) {
					_resData[uid] = currentData[uid]
					counter++
				} 
			}
			return _resData;	
		},
		getFieldIndx: function (field) {
			return this.modelStructureObj[field];
		}
	})

	var ModelManager = tilt.Class.extend({
		init: function () {
			
		},
		create: function (modelName,modelStructure,initData) {
			var model = new Model(modelName,modelStructure,initData);
			models[modelName] = model;
			return model;
		},
		getModel: function (modelName) {
			return models[modelName];
		},
		removeModel: function (modelName) {
			models[modelName].delete();
			delete models[modelName];
		}
	});


	tilt.Model = new ModelManager();
	return tilt
	
}(window.tilt));