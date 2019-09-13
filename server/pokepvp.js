module.exports = {
    pokemonTypes: ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"],
    removeSelectedItem : (arr, deleteItem) => {
        return arr.filter((item) => {
            return item != deleteItem;
        })
    },
    randomThreeItemsChooser : function(){
        let selectedTypes = [];
        let tempPokeTypes = this.pokemonTypes;
        for (let i = 0; i < 3; i++) {
            let type = tempPokeTypes[Math.floor(Math.random() * tempPokeTypes.length)];
            tempPokeTypes = this.removeSelectedItem(tempPokeTypes, type);
            selectedTypes.push(type);
        }
        return selectedTypes
    }
}
