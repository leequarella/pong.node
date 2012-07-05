class MathUtils
  constructor: ->
    
  radsToDegs: (rads) ->
    rads * (180/Math.PI)

  degsToRads: (degs) ->
    degs * (Math.PI/180)

exports.MathUtils = MathUtils
