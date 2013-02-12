(function (tilt){

    var LoaderBase = function (event_emmiter) {

        var queue = {},
            _bind = tilt.utils.bind,
            _emit = _bind(event_emmiter.emit,event_emmiter),
            _on = _bind(event_emmiter.on,event_emmiter),
            _off = _bind(event_emmiter.off,event_emmiter);


        var BaseLoader = tilt.Class.extend({
            init: function (info) {
                this.info = info;
                _on('start',_bind(this.start,this));
            }
            ready: function (data) {
                _emit('ready',[data,this.name])
            } 
        })
      

        var Loader = tilt.Class.extend({
            init: function () {
                this.data = {};
                _on('ready',_bind(this.ready,this));
            },
            loadJson: function (name,url) {
                var obj = { 
                    event_name : 'json_loader_'+name,
                    name: name,
                    url: url
                };
                new JSONLoader(obj);    
            },
            loadTemplate: function(name,url) {
                var obj = { 
                    event_name : 'template_loader_'+name,
                    name: name,
                    url: url
                };
                new TemplateLoader(obj);
            },
            loadImage: function (url) {
                var obj = { 
                    event_name : 'image_loader_'+url,
                    url: url
                };
                new ImageLoader(obj);
            },
            catchEvent: function (name) {
                var obj = { 
                    event_name : 'event_catcher_'+name,
                    name: name
                };
                new EventCatcher(obj);
            },
            waitEvent: function (name) {
                var obj = { 
                    event_name : 'event_waiter_'+name,
                    name: name
                };
                new EventWaiter(obj);
            },  
            add_callback: function (cb,start) {
                _on('fire_callback',function (data) {
                    cb(data)
                });
                if (start) {
                    this.start();    
                }
            },
            set_data: function (data) {
                this.data['stored_data'] = data;
            },
            start: function () {
                _emit('start');
            },
            ready: function (name,data) {
                delete queue[name];
                this.data[name] = data;
                if (queue.length == 0) {
                    _emit('fire_callback',this.data);
                }
            }
        });

        return new Loader();
    };
    
    tilt.loader = function () {
        return LoaderBase(new tilt._Events())
    };

    return tilt;

}(window.tilt));