(function() {
    function GamePainter(state, containerWrapper, container)
    {
        this.state = state
        this.containerWrapper = containerWrapper
        this.container = container
        $(window).resize(GamePainter.prototype.paint.bind(this))
        GamePainter.created.raise(this)
    }
    GamePainter.created = new arcanoid.Event
    GamePainter.prototype.itemPainters = []
    GamePainter.addItemPainter = function(itemPainter)
    {
        GamePainter.prototype.itemPainters.push(itemPainter)
    }

    GamePainter.prototype.toScreen = function(x,y) {
        var o = this.container.offset()
        return {
            left: o.left + this.container.width() * x,
            top: o.top + this.container.height() * y
        }
    }

    GamePainter.prototype.widthToScreen = function(w) {
        return this.container.width() * w
    }

    GamePainter.prototype.heightToScreen = function(h) {
        return this.container.height() * h
    }

    GamePainter.prototype.paint = function()
    {
        var squareSize = Math.min(this.containerWrapper.width(), this.containerWrapper.height());
        this.container.width(squareSize)
        this.container.height(squareSize)

        var self = this
        self.container.html('')
        self.itemPainters.forEach((itemPainter)=>itemPainter.call(self))
    }

    arcanoid.GamePainter = GamePainter
})()
