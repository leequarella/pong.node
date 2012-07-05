#	@ Author Lee Quarella

#Initialize the server
port = process.env.PORT || 3001
express = require 'express'
app = express.createServer()
io = require('socket.io').listen(app)
app.listen port
app.use express.bodyParser()

app.configure () ->
  app.set('views', __dirname + '/views')
  app.use express.static(__dirname + '/views')
  app.use app.router
  app.set("view options", {layout: false})

  app.register '.html', compile: (str, options) -> return (locals) -> return str

Clients = require("./javascripts/clients").Clients
Clients = new Clients

Security = require("./javascripts/security").Security
Security = new Security

Logger = require("./logger").Logger
Logger = new Logger

PongGame = require('./javascripts/pong/main_loop').MainLoop
Pong = new PongGame(1, io)

app.get '/', (req, res) ->
  if Security.checkCredentials req.body.credentials
    res.render("views/index.html")
    Logger.info "!! GET REQUEST RECEIVED !!"
    io.sockets.in(req.body.channel).emit(req.body.message_type, { message: req.body.message })

app.get '/pong', (req, res) ->
  Logger.info "!! PONG GET REQUEST RECEIVED !!"
  res.render("pong.html")

app.get '/pong/javascripts/:file', (req, res) ->
  Logger.info "!! PONG JAVASCRIPT GET REQUEST RECEIVED !! " +  req.params.file
  res.sendfile('public/javascripts/' + req.params.file)

app.post '/', (req, res) ->
  # First checks to make sure the request has the proper credentials.
  # Then accepts a post request (params: channel, message_type, message).
  # Finally sends the message_type and message to the channel
  if Security.checkCredentials req.body.credentials
    res.send("received")
    Logger.info "EMMITING (post) " + req.body.message_type + " to channel " + req.body.channel + ": " + req.body.message
    io.sockets.in(req.body.channel).emit(req.body.message_type, { message: req.body.message })

io.sockets.on 'connection', (socket) ->
  Logger.info "Client connected"
  Clients.newClient(socket)

  socket.on 'set nickname', (data) ->
    Logger.info "Nickname set " + data. nickname
    Clients.setNickname(socket, data.nickname)

  socket.on "change channel", (data) ->
    Logger.info "Client joining channel " + data.channel
    Clients.joinChannel(socket, data.channel)

  socket.on 'disconnect', ->
    Logger.info "Client disconnected. " + socket.id
    Clients.disconnect(socket)

  socket.on 'broadcast', (data) ->
    Logger.info "Client Broadcasting " + socket.id
    Clients.broadcast(socket, data.message)

  socket.on 'paddleMove', (data) ->
    Logger.info "Paddle Move " + socket.id
    Pong.world.paddleMoving(data.paddle, data.direction)
