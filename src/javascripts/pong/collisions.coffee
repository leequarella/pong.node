class @CollisionDetector
  constructor: ->

  boundaries: (obj, bounds) ->
    collision = false
    if obj.topEdge() <= bounds.topEdge()
      obj.y = bounds.topEdge()
      collision = true
    if obj.bottomEdge() >= bounds.bottomEdge()
      obj.y = bounds.bottomEdge() - obj.height
      collision = true
    collision

  detect: (obj1, obj2) ->
    collision = false
    #this assumes the ball has not magically teleported through the paddle
    if obj1.x <= obj2.rightEdge() && obj1.x >= obj2.leftEdge() &&
    obj1.bottomEdge() >= obj2.topEdge() && obj1.topEdge() <= obj2.bottomEdge()
      #collision with from right
      collision = true
    if obj1.x >= obj2.leftEdge() && obj1.x <= obj2.rightEdge() &&
    obj1.bottomEdge() >= obj2.topEdge() && obj1.topEdge() <= obj2.bottomEdge()
      #collision with from left
      collision = true
    collision
