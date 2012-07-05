CollisionDetector = require('./collisions').CollisionDetector
GeometricObject = require('./geometric_object').GeometricObject
MoveableObject = require('./moveable_object').MoveableObject
class @World
  score: {left: 0, right: 0}
  moving: {left: 'stopped', right: 'stopped'}
  constructor: ->
    @collisions = new CollisionDetector()
    p_height = 50
    p_start_top = 50
    p_speed = 0.2
    left_bounds = new GeometricObject(0,0,300,100)
    right_bounds = new GeometricObject(500,0,300,100)
    ball_bounds = new GeometricObject(0,0,300,600)
    @paddleLeft = new MoveableObject(50,p_start_top,p_height,10,p_speed,left_bounds)
    @paddleRight = new MoveableObject(500,p_start_top,p_height,10,p_speed,right_bounds)
    @ball = new MoveableObject(300,150,5,5,.3,ball_bounds)

  initialize: ->
    lr = if(Math.random() > 0.5) then 0 else 180
    @ball.angle = (Math.floor(Math.random() * 90) - 45) + lr
    #@ball.angle = 160
    @ball.cleanAngle()
    @ball.moveToCenter()

  paddleMoving: (paddle, direction) ->
    @moving[paddle] = direction

  move: (delta) ->
    @ball.move(delta)
    @paddleLeft.moveUp(delta) if @moving['left'] == 'up'
    @paddleLeft.moveDown(delta) if @moving['left'] == 'down'
    @paddleRight.moveUp(delta) if @moving['right'] == 'up'
    @paddleRight.moveDown(delta) if @moving['right'] == 'down'

  detectGoal: ->
    if @ball.leftEdge() <= @ball.bounds.leftEdge()
      @scoreUp('right', 1)
      @initialize()
    if @ball.rightEdge() >= @ball.bounds.rightEdge()
      @scoreUp('left', 1)
      @initialize()

  scoreUp: (paddle, amount) ->
    @score[paddle] += amount
    if @score.left >= 7 or @score.right >= 7
      @score.left = 0
      @score.right = 0


  handleCollisions: ->
    if @collisions.detect(@ball, @paddleLeft)
      @ball.x = @paddleLeft.rightEdge()
      @ball.reflect()
    if @collisions.detect(@ball, @paddleRight)
      @ball.x = @paddleRight.leftEdge() - @ball.width
      @ball.reflect()
    @ball.deflect() if @collisions.boundaries(@ball, @ball.bounds)

  tick: (delta, keys) ->
    @move(delta, keys)
    @detectGoal()
    @handleCollisions()
