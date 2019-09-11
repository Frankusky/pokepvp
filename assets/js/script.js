(function () {
    const pokemonTypes = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];
    let removeSelectedItem = (arr, deleteItem) => {
        return arr.filter((item) => {
            return item != deleteItem;
        })
    }
    let randomThreeItemsChooser = () => {
        let selectedTypes = [];
        let tempPokeTypes = pokemonTypes;
        for (let i = 0; i < 3; i++) {
            let type = tempPokeTypes[Math.floor(Math.random() * tempPokeTypes.length)];
            tempPokeTypes = removeSelectedItem(tempPokeTypes, type);
            selectedTypes.push(type);
        }
        return selectedTypes
    }

    document.querySelector(".randomChooseBtn").addEventListener("click", function () {
        document.querySelector(".types").innerHTML = "";
        randomThreeItemsChooser().forEach(function(type,index){
            document.querySelector(".types").innerHTML += `<span class="${type}">${type}</span>`
        })
    })

    /*
        PUTO el que modifique esto ilegalmente >:v
    */
//    let endpoint = atob("aHR0cHM6Ly93d3cuanNvbnN0b3JlLmlvLzNhNzE2ZWMyZTI4MDZlOTZlMGIxOWI3MGUzNWYxZGU4NzAyZjFhNDQ0YWIwMTJlNWI2MmQ5MjM4M2JmOTNiYWU=");
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
