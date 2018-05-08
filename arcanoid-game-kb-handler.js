(function() {
    function GameKbHandler()
    {
        var self = this
        self.keysPressed = {}
        self.handlers = {}
        $(window).keydown(function(e) {
            if (!self.keysPressed[e.key]) {
                var handlers = self.handlers[e.key]
                if (handlers)
                    handlers.forEach(h => h.down(e))
            }
            self.keysPressed[e.key] = true
        })
        $(window).keyup(function(e) {
            self.keysPressed[e.key] = false
            var handlers = self.handlers[e.key]
                if (handlers)
                    handlers.forEach(h => h.up(e))
        })
    }
    GameKbHandler.prototype.handle = function(key, onDown, onUp) {
        var handlers = this.handlers[key]
        if (!handlers)
            handlers = this.handlers[key] = []
        handlers.push({down: onDown, up: onUp})
        return this
    }

    arcanoid.GameKbHandler = GameKbHandler
})()
