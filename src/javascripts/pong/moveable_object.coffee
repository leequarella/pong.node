GeometricObject = require('./geometric_object').GeometricObject
MathUtils = require('./math_utils').MathUtils
class MoveableObject extends GeometricObject
  constructor: (x,y, @height, @width, @speed, @bounds) ->
    @MathUtils = new MathUtils
    @height = 2 if !height
    @width =  1 if !width
    @x = x || 0
    @y = y || 0
    @bounds = new GeometricObject(15,15,10,10) if !bounds
    @speed =  1 if !speed
    @angle = 0

  move: (delta) ->
    distance = delta * @speed
    y = distance * Math.sin(@MathUtils.degsToRads(@angle))
    x = -(distance * Math.sin(@MathUtils.degsToRads(90 - @angle)))
    @x += parseFloat(x.toFixed(2))
    @y += parseFloat(y.toFixed(2))
    if @rightEdge() > @bounds.rightEdge()
      @x = @bounds.rightEdge() - @width
    if @bottomEdge() > @bounds.bottomEdge()
      @y = @bounds.bottomEdge() - @height

  moveUp: (delta) ->
    distance = delta * @speed
    @y = @y + distance
    if @topEdge() < @bounds.topEdge()
      @y = @bounds.topEdge()

  moveDown: (delta) ->
    distance = delta * @speed
    @y = @y - distance
    if @bottomEdge() > @bounds.bottomEdge()
      @y = @bounds.bottomEdge() - @height

  moveToCenter: ->
    @x = @bounds.centerX() - (@width/2)
    @y = @bounds.centerY() - (@height/2)


  #deflect and reflect currently assume the object is in a box
  reflect: ->
    n = @reflectNormalizer(@angle)
    b =  180 - (n.angle + 90)
    @angle = (b + n.changed) + 90
    @cleanAngle()

  reflectNormalizer: (angle) ->
    n =
      angle: 0
      changed: 0
    if angle > 0 && angle < 90
      n.changed = 0
    if angle > 90 && angle < 180
      n.changed = 180
    if angle > 180 && angle < 270
      n.changed = 180
    if angle > 270 && angle < 360
      n.changed = 360
    n.angle = angle - n.changed
    n

  # we're not handling the 90 or 270 cases because they should never happen in pong
  deflect: ->
    @angle = 360 - @angle
    @cleanAngle()

  cleanAngle: ->
    @angle += 360 if @angle < 0
    @angle -= 360 if @angle > 360

exports.MoveableObject = MoveableObject
