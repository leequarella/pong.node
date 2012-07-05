class @KeyDetector
  constructor: ->
    $("body").keypress(=>@keypress(event))
    $("body").keyup(=>@keyUp(event))

  pressed: {}

  keypress: (event) ->
    switch event.which
      when 119
        paddle = 'left'
        direction = 'up'
      when 115
        paddle = 'left'
        direction = 'down'
      when 105
        paddle = 'right'
        direction = 'up'
      when 107
        paddle = 'right'
        direction = 'down'
    if direction && paddle
      SocketHandler.movePaddle(paddle, direction)
    @pressed[event.which] = true

  keyUp: (event) ->
    switch event.which
      when 87
        paddle = 'left'
        direction = 'stop'
      when 83
        paddle = 'left'
        direction = 'stop'
      when 73
        paddle = 'right'
        direction = 'stop'
      when 75
        paddle = 'right'
        direction = 'stop'
    if direction && paddle
      SocketHandler.movePaddle(paddle, direction)
    delete @pressed[event.which]
