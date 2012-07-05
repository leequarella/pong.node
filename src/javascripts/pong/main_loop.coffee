World = require('./world').World
class MainLoop
  constructor: (@channel, @io)->
    @toRender = {}
    @world = new World()
    @lastExecuted = new Date()
    @world.initialize()
    setInterval(( ()=> @loop() ), 5)

  sendToWorldClients: ->
    @toRender.ball = @world.ball
    @toRender.paddleLeft = @world.paddleLeft
    @toRender.paddleRight = @world.paddleRight
    @toRender.score = @world.score
    @io.sockets.in(@channel).emit("render", {game: @toRender})


  loop: ->
    now = new Date()
    delta = @lastExecuted - now
    @world.tick(delta)
    @lastExecuted = now
    @sendToWorldClients()


exports.MainLoop = MainLoop
