

tilt.module.create('sender',function (sb) {

	

	var Sender = Class('Sender', {
		init : function (name) {
			this.name = name;
		},
		sayHi : function () {
			console.log('hi', this.name);
		},
		tick : function () {
			console.log('tick')
		} 	
	});

	var Sender1 = Class('Sender1', {
		extend : Sender,
		init : function (name) {
			this.name = name;	
		},
		tick : function () {
			console.log('tick tack')
		}
	});



	sb.on('create_sender',function () {
		var sender = new Sender('me_1');
		var sender1 = new Sender1('me_2');
		console.log(sender1)

		console.log('sender -----------------');
		sender.sayHi();
		sender.tick();
		sender1.sayHi();
		sender1.tick();
	});
});

tilt.module.create('getter',function (sb) {

	sb.on('signal', function (sender) {
		console.log('ticktack', sender);
	})
});



