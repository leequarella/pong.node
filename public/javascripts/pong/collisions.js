(function() {

  this.CollisionDetector = (function() {

    function CollisionDetector() {}

    CollisionDetector.prototype.boundaries = function(obj, bounds) {
      var collision;
      collision = false;
      if (obj.topEdge() <= bounds.topEdge()) {
        obj.y = bounds.topEdge();
        collision = true;
      }
      if (obj.bottomEdge() >= bounds.bottomEdge()) {
        obj.y = bounds.bottomEdge() - obj.height;
        collision = true;
      }
      return collision;
    };

    CollisionDetector.prototype.detect = function(obj1, obj2) {
      var collision;
      collision = false;
      if (obj1.x <= obj2.rightEdge() && obj1.x >= obj2.leftEdge() && obj1.bottomEdge() >= obj2.topEdge() && obj1.topEdge() <= obj2.bottomEdge()) {
        collision = true;
      }
      if (obj1.x >= obj2.leftEdge() && obj1.x <= obj2.rightEdge() && obj1.bottomEdge() >= obj2.topEdge() && obj1.topEdge() <= obj2.bottomEdge()) {
        collision = true;
      }
      return collision;
    };

    return CollisionDetector;

  })();

}).call(this);
