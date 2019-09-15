module.exports = {
    pokemonTypes: ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"],
    removeSelectedItem: (arr, deleteItem) => {
        return arr.filter((item) => {
            return item != deleteItem;
        })
    },
    randomItemSelector: (items) => {
        return items[Math.floor(Math.random() * items.length)]
    },
    randomThreeItemsChooser: function (enableRepeat) {
        let selectedTypes = [];
        let tempPokeTypes = this.pokemonTypes;
        for (let i = 0; i < 3; i++) {
            let type = this.randomItemSelector(tempPokeTypes);
            if (!enableRepeat) tempPokeTypes = this.removeSelectedItem(tempPokeTypes, type);
            selectedTypes.push(type);
        }
        return selectedTypes
    },
    randomSingleTypeChooser: function () {
        return [this.randomItemSelector(this.pokemonTypes)]
    }
}
