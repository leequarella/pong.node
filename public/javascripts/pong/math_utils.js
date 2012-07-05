(function() {
  var MathUtils;

  MathUtils = (function() {

    function MathUtils() {}

    MathUtils.prototype.radsToDegs = function(rads) {
      return rads * (180 / Math.PI);
    };

    MathUtils.prototype.degsToRads = function(degs) {
      return degs * (Math.PI / 180);
    };

    return MathUtils;

  })();

  exports.MathUtils = MathUtils;

}).call(this);
