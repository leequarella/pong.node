(function() {

  this.SocketHandler = (function() {

    function SocketHandler() {
      var _this = this;
      this.socket = io.connect();
      this.socket.emit("change channel", {
        channel: 1
      });
      this.socket.on('channel message', function(data) {
        return _this.writeToScreen(data.userName, data.mes);
      });
      this.socket.on('render', function(data) {
        return UI.render(data.game);
      });
      $("#message").keyup(function(event) {
        if (event.keyCode === 13) return this.sendSock();
      });
    }

    SocketHandler.prototype.startChat = function() {
      $("#userName").hide();
      $("#chat").show();
      return this.socket.emit("set nickname", {
        nickname: $("#name").val()
      });
    };

    SocketHandler.prototype.sendMessage = function() {
      var mes;
      mes = $("#message").val();
      $("#message").val("");
      this.socket.emit('broadcast', {
        message: mes
      });
      return this.writeToScreen($("#name").val(), mes);
    };

    SocketHandler.prototype.writeToScreen = function(who, data) {
      var html;
      html = $("#messages").html();
      html += "<br><b>" + who + ":</b> " + data;
      return $("#messages").html(html).scrollTop($("#messages").outerHeight());
    };

    SocketHandler.prototype.changeChannel = function(channel) {
      $("#channelName").html("Channel " + channel);
      return this.socket.emit("change channel", {
        channel: channel
      });
    };

    SocketHandler.prototype.movePaddle = function(paddle, direction) {
      return this.socket.emit("paddleMove", {
        paddle: paddle,
        direction: direction
      });
    };

    return SocketHandler;

  })();

}).call(this);
