"use strict";
let express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server),
    pokepvp = require("./pokepvp.js"),
    allUsers = [];
/*
allUsers = [{
    username: "Frankusky",
    id: ######,
    rival: "",
    role: "host", //or visitor
    fighting: true
}]

*/
app.set('port', (process.env.PORT || 5000));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.status(200);
})

io.on("connection", (socket) => {
    io.sockets.emit("updateUserList", allUsers.map(user => {
        return user.username
    }))

    socket.on("newUser", (data) => {
        var validNewUser = true;
        allUsers.some(user => {
            if (user.id == socket.id || user.username == data.username) {
                validNewUser = false
                return true
            }
        })
        if (validNewUser) allUsers.push({
            id: socket.id,
            username: data.username,
            challengeResponse: false
        });
        io.sockets.emit("updateUserList", allUsers.map(user => {
            return user.username
        }))
    })

    socket.on("requestThreeRandomPokemons", userData => {
        var selectedTypes = pokepvp.randomThreeItemsChooser();
        allUsers.forEach((item, index) => {
            if (userData.rival) {
                if (item.challengeResponse && (userData.username === item.username || userData.rival === item.username)) {
                    io.to(item.id).emit("displayPokemonTypes", selectedTypes)
                }
            } else {
                if(!item.fighting){                    
                    io.sockets.emit("displayPokemonTypes", pokepvp.randomThreeItemsChooser());
                }
            }
        })
    })

    socket.on("challengeUser", (userdata) => {
        allUsers.forEach((item, index) => {
            //actualizando datos del host
            if (userdata.username == item.username) {
                allUsers[index].role = "host";
                allUsers[index].rival = userdata.rival;
            }
            //actualizando data del rival
            if (userdata.rival == item.username) {
                allUsers[index].role = "visitor";
                allUsers[index].rival = userdata.username;
                socket.broadcast.to(item.id).emit("confirmChallenge", {
                    message: userdata.username + " has challenged you!",
                    rival: userdata.username
                })
            }
        })
    })

    socket.on("challengeResponse", data => {
        allUsers.forEach((item, index) => {
            if (data.challengeResponse) {
                if (data.username === item.username || data.rival === item.username) {
                    allUsers[index].fighting = true;
                    allUsers[index].challengeResponse = true;
                }
            } else {
                if (data.username === item.username || data.rival === item.username) {
                    allUsers[index].fighting = false;
                    allUsers[index].role = "";
                    allUsers[index].rival = "";
                    allUsers[index].challengeResponse = false;
                }
            }
        })
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
