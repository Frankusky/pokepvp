(function () {
    "use strict";
    let socket = io.connect("/", {
        forceNew: true
    })

    let loadMessage = (data) => {
        let html = `<div><strong>${data.username}</strong> says: ${data.username}</div>`;
        document.querySelector(".usersList").innerHTML = html;
    }

    socket.on("updateUserList", data => {
        document.querySelector(".usersList").innerHTML = "";
        data.forEach(username => {
            let newUserDom = document.createElement("span");
            newUserDom.textContent = username;
            document.querySelector(".usersList").appendChild(newUserDom);
        })
    })
    socket.on("displayPokemonTypes", data => {        
        document.querySelector(".types").innerHTML = "";
        document.querySelector(".types").classList.add('showTypes');
        data.forEach(function (type) {
            document.querySelector(".types").innerHTML += `<span class="icoType ${type.toLowerCase()}">${type}</span>`
        })
    })

    let newUser = () => {
        let payload = {
            username: document.querySelector(".username").value
        };

        socket.emit("newUser", payload);
        return false
    }

    document.querySelector("#login").addEventListener("click", function () {
        newUser();
    })
    document.querySelector(".randomChooseBtn").addEventListener("click", function () {
        socket.emit("requestThreeRandomPokemons");
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
