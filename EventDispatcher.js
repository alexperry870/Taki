function EventDispatcher (sender) {
    this._sender = sender,
    this._listeners = [],

    this.attach = function (listener) {
        this._listeners.push(listener);
    },

    this.notify =  function (args) {
        for (var i = 0; i < this._listeners.length; i += 1) {
            this._listeners[i](this._sender, args);
        }
    },

    this.disattach = function(listener) {
        var indexOfL= this._listeners.indexOf(listener);
        this._listeners.splice(indexOfL,1);
    }

};