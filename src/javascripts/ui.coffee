class @GameUi
  constructor: () ->

  render: (game) ->
    $("body").html("")
    @renderGeometricObject(game.ball.bounds, "black")
    @renderGeometricObject(game.paddleLeft, "blue")
    @renderGeometricObject(game.paddleRight, "blue")
    @renderGeometricObject(game.ball, "red")
    @renderScore(game.score)

  renderGeometricObject: (geometricObject, color) ->
    div = $("<div/>")
      .css("height",geometricObject.height)
      .css("width",geometricObject.width)
      .css("border", "1px solid " + color)
      .css("position", "absolute")
      .css("margin-top", geometricObject.y)
      .css("margin-left", geometricObject.x)
    $("body").append(div)

  renderScore:(score) ->
    div = $("<div/>")
      .html("Left: " + score.left + "<br> Right: " + score.right)
    $("body").append(div)
