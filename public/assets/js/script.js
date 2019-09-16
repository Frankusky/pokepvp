(function () {
    "use strict";
    var pokemonList = (function () {
        return Array.from(document.getElementById("pokemonsNames").options).reduce(function (prev, current) {
            prev[current.value] = current.getAttribute("img-value");
            return prev
        },{})
    })();
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
        document.querySelector(".types").innerHTML = "";
        document.querySelector(".types").classList.add('showTypes');
        data.forEach(function (type) {
            document.querySelector(".types").innerHTML += `<span class="icoType ${type.toLowerCase()}">${type}</span>`
        })
    })

    socket.on("confirmChallenge", response => {
        userData.challengeResponse = confirm(response.message);
        if (userData.challengeResponse) {
            userData.rival = response.rival;
            userData.role = "visitor";
        }
        socket.emit("challengeResponse", userData);
    })

    document.querySelector("#login").addEventListener("click", function () {
        userData.username = document.querySelector(".username").value;
        socket.emit("newUser", userData);
    })

    document.querySelectorAll("[name='typeAmmount']").forEach(function (item) {
        item.addEventListener("click", function () {
            if (this.value == 3) {
                document.getElementById("enableRepeatedRandoms").disabled = false;
            } else {
                document.getElementById("enableRepeatedRandoms").disabled = true;
                document.getElementById("enableRepeatedRandoms").checked = false;
            }
        })
    })
    document.querySelector(".randomChooseBtn").addEventListener("click", function () {
        var typesAmmount = document.querySelector("[name='typeAmmount']:checked").value;
        var repeatTypes = document.getElementById("enableRepeatedRandoms").checked;
        socket.emit("requestRandomPokemons", {
            userData: userData,
            ammount: typesAmmount,
            repeat: repeatTypes
        });
    })

    document.querySelector(".challengeUser").addEventListener("click", function () {
        let selectedUser = document.querySelector(".usersList").selectedOptions[0].value;
        userData.rival = selectedUser;
        socket.emit("challengeUser", userData);
    })

    document.querySelectorAll(".pokemonName").forEach(item => {
        item.addEventListener("blur", function () {
            if (Object.keys(pokemonList).indexOf(this.value) === -1) {
                this.value = "";
                this.parentElement.querySelector(".pokeImg").setAttribute("src", ""); 
            } else {
                this.parentElement.querySelector(".pokeImg").setAttribute("src", "https://pokemon.gameinfo.io/images/pokemon-go/thumbs/60/"+pokemonList[this.value]+".webp"); 
            }
        })
    })
})()
