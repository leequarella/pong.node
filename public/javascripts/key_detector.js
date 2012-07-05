(function() {

  this.KeyDetector = (function() {

    function KeyDetector() {
      var _this = this;
      $("body").keypress(function() {
        return _this.keypress(event);
      });
      $("body").keyup(function() {
        return _this.keyUp(event);
      });
    }

    KeyDetector.prototype.pressed = {};

    KeyDetector.prototype.keypress = function(event) {
      var direction, paddle;
      switch (event.which) {
        case 119:
          paddle = 'left';
          direction = 'up';
          break;
        case 115:
          paddle = 'left';
          direction = 'down';
          break;
        case 105:
          paddle = 'right';
          direction = 'up';
          break;
        case 107:
          paddle = 'right';
          direction = 'down';
      }
      if (direction && paddle) SocketHandler.movePaddle(paddle, direction);
      return this.pressed[event.which] = true;
    };

    KeyDetector.prototype.keyUp = function(event) {
      var direction, paddle;
      switch (event.which) {
        case 87:
          paddle = 'left';
          direction = 'stop';
          break;
        case 83:
          paddle = 'left';
          direction = 'stop';
          break;
        case 73:
          paddle = 'right';
          direction = 'stop';
          break;
        case 75:
          paddle = 'right';
          direction = 'stop';
      }
      if (direction && paddle) SocketHandler.movePaddle(paddle, direction);
      return delete this.pressed[event.which];
    };

    return KeyDetector;

  })();

}).call(this);
