(function() {
  var CollisionDetector, GeometricObject, MoveableObject;

  CollisionDetector = require('./collisions').CollisionDetector;

  GeometricObject = require('./geometric_object').GeometricObject;

  MoveableObject = require('./moveable_object').MoveableObject;

  this.World = (function() {

    World.prototype.score = {
      left: 0,
      right: 0
    };

    World.prototype.moving = {
      left: 'stopped',
      right: 'stopped'
    };

    function World() {
      var ball_bounds, left_bounds, p_height, p_speed, p_start_top, right_bounds;
      this.collisions = new CollisionDetector();
      p_height = 50;
      p_start_top = 50;
      p_speed = 0.2;
      left_bounds = new GeometricObject(0, 0, 300, 100);
      right_bounds = new GeometricObject(500, 0, 300, 100);
      ball_bounds = new GeometricObject(0, 0, 300, 600);
      this.paddleLeft = new MoveableObject(50, p_start_top, p_height, 10, p_speed, left_bounds);
      this.paddleRight = new MoveableObject(500, p_start_top, p_height, 10, p_speed, right_bounds);
      this.ball = new MoveableObject(300, 150, 5, 5, .3, ball_bounds);
    }

    World.prototype.initialize = function() {
      var lr;
      lr = Math.random() > 0.5 ? 0 : 180;
      this.ball.angle = (Math.floor(Math.random() * 90) - 45) + lr;
      this.ball.cleanAngle();
      return this.ball.moveToCenter();
    };

    World.prototype.paddleMoving = function(paddle, direction) {
      return this.moving[paddle] = direction;
    };

    World.prototype.move = function(delta) {
      this.ball.move(delta);
      if (this.moving['left'] === 'up') this.paddleLeft.moveUp(delta);
      if (this.moving['left'] === 'down') this.paddleLeft.moveDown(delta);
      if (this.moving['right'] === 'up') this.paddleRight.moveUp(delta);
      if (this.moving['right'] === 'down') return this.paddleRight.moveDown(delta);
    };

    World.prototype.detectGoal = function() {
      if (this.ball.leftEdge() <= this.ball.bounds.leftEdge()) {
        this.scoreUp('right', 1);
        this.initialize();
      }
      if (this.ball.rightEdge() >= this.ball.bounds.rightEdge()) {
        this.scoreUp('left', 1);
        return this.initialize();
      }
    };

    World.prototype.scoreUp = function(paddle, amount) {
      this.score[paddle] += amount;
      if (this.score.left >= 7 || this.score.right >= 7) {
        this.score.left = 0;
        return this.score.right = 0;
      }
    };

    World.prototype.handleCollisions = function() {
      if (this.collisions.detect(this.ball, this.paddleLeft)) {
        this.ball.x = this.paddleLeft.rightEdge();
        this.ball.reflect();
      }
      if (this.collisions.detect(this.ball, this.paddleRight)) {
        this.ball.x = this.paddleRight.leftEdge() - this.ball.width;
        this.ball.reflect();
      }
      if (this.collisions.boundaries(this.ball, this.ball.bounds)) {
        return this.ball.deflect();
      }
    };

    World.prototype.tick = function(delta, keys) {
      this.move(delta, keys);
      this.detectGoal();
      return this.handleCollisions();
    };

    return World;

  })();

}).call(this);
