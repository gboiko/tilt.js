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

	sb.on('create_sender', function () { });
});

tilt.module.create('getter',function (sb) {

	sb.on('signal', function (sender) {
		console.log('ticktack', sender);
	})
});



tilt.module.run();