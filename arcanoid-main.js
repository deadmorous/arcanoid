$(document).ready(function() {
    var gameState = new arcanoid.GameState
    var painter = new arcanoid.GamePainter(gameState, $('#game-wrapper'), $('#game'))
    painter.paint()

    var timerDelta = 0.04

    setInterval(function() {
        gameState.next(timerDelta)
    }, timerDelta*1000)


    var kbHandler = new arcanoid.GameKbHandler
    kbHandler
        .handle('ArrowLeft',
            gameState.paddle.decSpeed.bind(gameState.paddle),
            gameState.paddle.incSpeed.bind(gameState.paddle))
        .handle('ArrowRight',
            gameState.paddle.incSpeed.bind(gameState.paddle),
            gameState.paddle.decSpeed.bind(gameState.paddle))
})
