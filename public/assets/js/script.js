(function () {
    "use strict";
    let socket = io.connect("/", {
            forceNew: true
        }),
        userData = {};

    socket.on("updateUserList", data => {
        document.querySelector(".usersList").innerHTML = "<option value=''>Select a player</option>";
        data.forEach(username => {
            if (document.querySelector(".username").value != username) {
                let newUserDom = document.createElement("option");
                newUserDom.textContent = username;
                newUserDom.value = username;
                document.querySelector(".usersList").appendChild(newUserDom);
            }
        })
    })

    socket.on("displayPokemonTypes", data => {
        console.log("asdf");
        document.querySelector(".types").innerHTML = "";
        document.querySelector(".types").classList.add('showTypes');
        data.forEach(function (type) {
            document.querySelector(".types").innerHTML += `<span class="icoType ${type.toLowerCase()}">${type}</span>`
        })
    })

    socket.on("confirmChallenge", response => {
        userData.challengeResponse = confirm(response.message);
        if(userData.challengeResponse){
            userData.rival = response.rival;
            userData.role = "visitor";
        }
        socket.emit("challengeResponse", userData);
    })

    document.querySelector("#login").addEventListener("click", function () {
        userData.username = document.querySelector(".username").value;
        socket.emit("newUser", userData);
    })

    document.querySelector(".randomChooseBtn").addEventListener("click", function () {
        socket.emit("requestThreeRandomPokemons", userData);
    })

    document.querySelector(".challengeUser").addEventListener("click", function () {
        let selectedUser = document.querySelector(".usersList").selectedOptions[0].value;
        userData.rival = selectedUser;
        socket.emit("challengeUser", userData);
    })
    /*
        PUTO el que modifique esto ilegalmente >:v
    */
    //    let endpoint = atob("aHR0cHM6Ly93d3cuanNvbnN0b3JlLmlvLzNhNzE2ZWMyZTI4MDZlOTZlMGIxOWI3MGUzNWYxZGU4NzAyZjFhNDQ0YWIwMTJlNWI2MmQ5MjM4M2JmOTNiYWU=");
    //    
    //    
    //    
    //    fetch(endpoint, {
    //        headers: {
    //            'Content-type': 'application/json',
    //            'Origin' : window.location.href
    //        },
    //        method: 'POST',
    //        body: JSON.stringify({
    //            name: 'jon snow',
    //            age: 31
    //        }),
    //    });
    //
    //    fetch(endpoint, {
    //        method: "GET",
    //        headers: {
    //            'Content-Type': 'application/json',
    //            'Origin' : window.location.href
    //        }
    //    }).then(res => res.json()).then(res => console.log(res))
})()
