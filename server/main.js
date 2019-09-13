"use strict";
let express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server),
    pokepvp = require("./pokepvp.js");

app.set('port', (process.env.PORT || 5000));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.status(200);
})

let allUsers = [];
io.on("connection", (socket) => {
    socket.on("newUser", (data) => {
        var validNewUser = true;
        allUsers.some(user => {
            if (user.id == socket.id) {
                validNewUser = false
                return true
            }
        })
        if (validNewUser) allUsers.push({
            id: socket.id,
            username: data.username,
            status: 0
        });
        io.sockets.emit("updateUserList", allUsers.map(user => {
            return user.username
        }))
    })
    socket.on("requestThreeRandomPokemons", () => {
        io.sockets.emit("displayPokemonTypes", pokepvp.randomThreeItemsChooser());
    })
    socket.on("disconnect", () => {
        allUsers = allUsers.filter(user => {
            return user.id != socket.id
        })
        io.sockets.emit("updateUserList", allUsers.map(user => {
            return user.username
        }))
    })
});

server.listen(app.get("port"), () => {
    console.log("Servidor corriendo en puerto " + app.get("port"))
})
