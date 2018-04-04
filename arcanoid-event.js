(function() {
    function Event()
    {
        this.handlers = []
    }
    Event.prototype.raise = function() {
        var a = arguments
        this.handlers.forEach(h => h.apply(null, a))
    }
    Event.prototype.handle = function(h) {
        this.handlers.push(h)
    }
    arcanoid.Event = Event
})()
