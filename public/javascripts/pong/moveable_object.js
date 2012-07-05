(function() {
  var GeometricObject, MathUtils, MoveableObject,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  GeometricObject = require('./geometric_object').GeometricObject;

  MathUtils = require('./math_utils').MathUtils;

  MoveableObject = (function(_super) {

    __extends(MoveableObject, _super);

    function MoveableObject(x, y, height, width, speed, bounds) {
      this.height = height;
      this.width = width;
      this.speed = speed;
      this.bounds = bounds;
      this.MathUtils = new MathUtils;
      if (!height) this.height = 2;
      if (!width) this.width = 1;
      this.x = x || 0;
      this.y = y || 0;
      if (!bounds) this.bounds = new GeometricObject(15, 15, 10, 10);
      if (!speed) this.speed = 1;
      this.angle = 0;
    }

    MoveableObject.prototype.move = function(delta) {
      var distance, x, y;
      distance = delta * this.speed;
      y = distance * Math.sin(this.MathUtils.degsToRads(this.angle));
      x = -(distance * Math.sin(this.MathUtils.degsToRads(90 - this.angle)));
      this.x += parseFloat(x.toFixed(2));
      this.y += parseFloat(y.toFixed(2));
      if (this.rightEdge() > this.bounds.rightEdge()) {
        this.x = this.bounds.rightEdge() - this.width;
      }
      if (this.bottomEdge() > this.bounds.bottomEdge()) {
        return this.y = this.bounds.bottomEdge() - this.height;
      }
    };

    MoveableObject.prototype.moveUp = function(delta) {
      var distance;
      distance = delta * this.speed;
      this.y = this.y + distance;
      if (this.topEdge() < this.bounds.topEdge()) {
        return this.y = this.bounds.topEdge();
      }
    };

    MoveableObject.prototype.moveDown = function(delta) {
      var distance;
      distance = delta * this.speed;
      this.y = this.y - distance;
      if (this.bottomEdge() > this.bounds.bottomEdge()) {
        return this.y = this.bounds.bottomEdge() - this.height;
      }
    };

    MoveableObject.prototype.moveToCenter = function() {
      this.x = this.bounds.centerX() - (this.width / 2);
      return this.y = this.bounds.centerY() - (this.height / 2);
    };

    MoveableObject.prototype.reflect = function() {
      var b, n;
      n = this.reflectNormalizer(this.angle);
      b = 180 - (n.angle + 90);
      this.angle = (b + n.changed) + 90;
      return this.cleanAngle();
    };

    MoveableObject.prototype.reflectNormalizer = function(angle) {
      var n;
      n = {
        angle: 0,
        changed: 0
      };
      if (angle > 0 && angle < 90) n.changed = 0;
      if (angle > 90 && angle < 180) n.changed = 180;
      if (angle > 180 && angle < 270) n.changed = 180;
      if (angle > 270 && angle < 360) n.changed = 360;
      n.angle = angle - n.changed;
      return n;
    };

    MoveableObject.prototype.deflect = function() {
      this.angle = 360 - this.angle;
      return this.cleanAngle();
    };

    MoveableObject.prototype.cleanAngle = function() {
      if (this.angle < 0) this.angle += 360;
      if (this.angle > 360) return this.angle -= 360;
    };

    return MoveableObject;

  })(GeometricObject);

  exports.MoveableObject = MoveableObject;

}).call(this);
