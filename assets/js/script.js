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
    
    document.querySelector(".randomChooseBtn").addEventListener("click", function(){
        document.querySelector(".types").innerHTML = randomThreeItemsChooser().join(", ")
    })
})()