"use strict";
let express = require("express"),
	app = express(),
	server = require("http").Server(app),
	io = require("socket.io")(server);
app.set('port', (process.env.PORT || 5000));

app.use(express.static("public"));

app.get("/", (req, res)=>{
	res.status(200);
})

io.on("connection", (socket)=>{
	socket.on("newMessage", (data)=>{
		io.sockets.emit("messages",data)
	})
});

server.listen(app.get("port"), ()=>{
	console.log("Servidor corriendo en puerto " + app.get("port"))
})