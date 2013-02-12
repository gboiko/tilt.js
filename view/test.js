tilt.module.create('sender',function (sb) {


	var Tank = sb.Class('Tank',{
		init: function (name) {
			this.name = name;
			console.log('hey you',name);
		},
		say: function () {
			console.log(this.name,'I am alive');
		}
	});

	var Gaubiza = sb.Class('Gaubiza',{
		extend: 'Tank',
		say: function () {
			console.log('this is '+this.name+'!!!!');
			this._super();
		}
	});

	console.log(sb.lsStructure());

	

	/*
	var view = sb.View('homePage');
	
	view.render(context);
	view.delete();

	
	var model = sb.Model.create(
			'programList',
			['title','name','uid','sample'],
			[[1,2,3,4],[2,3,4,5],[2,3,4,5]]
		);

	model.getAll();

	model.getTitle();

	model.getName();

	model.getMaxTitle();

	model.getMinTitle();

	model.findAll([['name',1]]);

	model.find(['name',1],5);

	model.assosiate('programUser','title');

	*/


	sb.on('create_sender', function () { });
});

tilt.module.create('getter',function (sb) {

	sb.on('signal', function (sender) {
		console.log('ticktack', sender);
	})
});



tilt.module.run();