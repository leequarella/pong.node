class @SocketHandler
  constructor: ->
    @socket = io.connect()
    @socket.emit("change channel", {channel:1})

    @socket.on 'channel message', (data) =>
      @writeToScreen(data.userName, data.mes)

    @socket.on 'render', (data) =>
      UI.render(data.game)

    $("#message").keyup (event)->
     if(event.keyCode == 13)
        @sendSock()

  startChat: ->
    $("#userName").hide()
    $("#chat").show()
    @socket.emit "set nickname", {nickname: $("#name").val()}

  sendMessage: ->
    mes = $("#message").val()
    $("#message").val("")
    @socket.emit('broadcast', { message: mes })
    @writeToScreen($("#name").val(), mes)

  writeToScreen: (who, data) ->
    html = $("#messages").html()
    html += "<br><b>" + who + ":</b> " + data
    $("#messages").html(html).scrollTop($("#messages").outerHeight())

  changeChannel: (channel) ->
    $("#channelName").html("Channel " + channel)
    @socket.emit("change channel", {channel: channel})

  movePaddle: (paddle, direction)->
    @socket.emit("paddleMove", {paddle: paddle, direction: direction})
