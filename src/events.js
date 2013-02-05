(function (tilt) {

	var Channel = (function(){
        function Channel(channel_name,events) {
            var $this = this;
            $this.events = events;
            $this.channel_name = channel_name;
            $this.channel_listeners = {};
        }

        Channel.prototype = {
        	addListener : function (listener,cb) {
	            this.channel_listeners[listener] = cb;
	            return this;
            },
            removeListener : function (listener) {
	            delete this.channel_listeners[listener];
	            return this;
	        },
	        emit : function (data) {
	            var listeners = this.channel_listeners;
	            for (var listener in listeners){
	                listeners[listener](data)
	            }
	            return this;
	        },
	        destroy : function () {
	            this.channel_listeners = null;
	            this.events = null;
	            this.channel_name = null;
	        }
        };

        return Channel;
    })();


	var Events = (function(){
    
	    function Events(){
	        this.channels = {};
	        return this;
	    }

	    Events.prototype = {
	    	on : function (name,listener,cb) {
				var channel = this.channels[name];
		        if (!channel) {
		            channel = this.createChannel(name)
		        }
		        channel.addListener(listener,cb);
		        return this;
	    	},
	    	emit : function (name,data) {
	    		var channel = this.getChannel(name);
		        if (channel) {
		            channel.emit(data);
		        }
	    	},
	    	off : function (name,listener) {
	    		var channel = this.getChannel(name);
		        if (channel) {
		            channel.removeListener(listener);
		        }
	    	},
	    	getChannel : function (channel) {
	    		if (this.channels[channel]){
		            return this.channels[channel]
		        } else {
		            return false
		        }
	    	},
	    	createChannel : function (name) {
		        var instance = new Channel(name,this);
		        this.channels[name] = instance;
		        return instance;
		    }
	    };

	    return Events;

	})();

	Events = new Events();

	tilt.on = tilt.utils.bind(Events.on,Events);
	tilt.emit = tilt.utils.bind(Events.emit,Events);
	tilt.off = tilt.utils.bind(Events.off,Events);

}(window.tilt))