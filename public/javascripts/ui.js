(function() {

  this.GameUi = (function() {

    function GameUi() {}

    GameUi.prototype.render = function(game) {
      $("body").html("");
      this.renderGeometricObject(game.ball.bounds, "black");
      this.renderGeometricObject(game.paddleLeft, "blue");
      this.renderGeometricObject(game.paddleRight, "blue");
      this.renderGeometricObject(game.ball, "red");
      return this.renderScore(game.score);
    };

    GameUi.prototype.renderGeometricObject = function(geometricObject, color) {
      var div;
      div = $("<div/>").css("height", geometricObject.height).css("width", geometricObject.width).css("border", "1px solid " + color).css("position", "absolute").css("margin-top", geometricObject.y).css("margin-left", geometricObject.x);
      return $("body").append(div);
    };

    GameUi.prototype.renderScore = function(score) {
      var div;
      div = $("<div/>").html("Left: " + score.left + "<br> Right: " + score.right);
      return $("body").append(div);
    };

    return GameUi;

  })();

}).call(this);
