(function() {
  var MainLoop, World;

  World = require('./world').World;

  MainLoop = (function() {

    function MainLoop(channel, io) {
      var _this = this;
      this.channel = channel;
      this.io = io;
      this.toRender = {};
      this.world = new World();
      this.lastExecuted = new Date();
      this.world.initialize();
      setInterval((function() {
        return _this.loop();
      }), 5);
    }

    MainLoop.prototype.sendToWorldClients = function() {
      this.toRender.ball = this.world.ball;
      this.toRender.paddleLeft = this.world.paddleLeft;
      this.toRender.paddleRight = this.world.paddleRight;
      this.toRender.score = this.world.score;
      return this.io.sockets["in"](this.channel).emit("render", {
        game: this.toRender
      });
    };

    MainLoop.prototype.loop = function() {
      var delta, now;
      now = new Date();
      delta = this.lastExecuted - now;
      this.world.tick(delta);
      this.lastExecuted = now;
      return this.sendToWorldClients();
    };

    return MainLoop;

  })();

  exports.MainLoop = MainLoop;

}).call(this);
