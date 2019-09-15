let request = require("request");
module.exports = {
    callApi: function (config) {
        return new Promise(function (resolve, reject) {
            request(config, function (err, response, body) {
                if (err) {
                    reject(err)
                }
                console.log(body)
                return resolve(JSON.parse(body).result)
            })
        })
    },
    endpoint: "https://www.jsonstore.io/3a716ec2e2806e96e0b19b70e35f1de8702f1a444ab012e5b62d92383bf93bae",
    getData: function (endpoint = this.endpoint) {
        let config = {
            url: endpoint,
            method: "GET"
        };
        return this.callApi(config);
    },
    postData: function (payload, endpoint = this.endpoint) {
        let config = {
            url: endpoint,
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Origin": "https://pokepvp.herokuapp.com"
            }
        }
        return this.callApi(config)
    },
    addUser: function (username) {
        let payload = {
            totalBattles: 0,
            battleLogs: {
                superball: {
                    battles: 0
                },
                ultraball: {
                    battles: 0
                },
                masterball: {
                    battles: 0
                }
            },
            pokeId: 0
        };
        return this.postData(payload, this.endpoint + "/" + username);
    },
    isNewUser: function (username) {
        let endpointUrl = this.endpoint + "/" + username
        return this.callApi(endpointUrl)
    }
}
/*
DB STRUCTURE SAMPLE
{
    Frankusky: {
        totalBattles: 3,
        totalWins: 3,
        pokeID: 0000 0000 0000,
        battleLogs:{
            superball:{
                battles: 1,
                0:{
                    rival: "Calizman",
                    types: ["water","fire", "electric"],
                    pokemons: ["squirtle", "charmander", "pikachu"],
                    rivalPokemons: ["magikarp", "vulpix", "magnamite"],
                    date: "2019-09-15T15:45:03.758Z",
                    win: true
                }                
            },
            ultraball:{
                battles: 1,
                0:{
                    rival: "Calizman",
                    types: ["water","fire", "electric"],
                    pokemons: ["squirtle", "charmander", "pikachu"],
                    rivalPokemons: ["magikarp", "vulpix", "magnamite"],
                    date: "2019-09-15T15:45:03.758Z",
                    win: true
                }                
            },
            masterball:{
                battles: 1,
                0:{
                    rival: "Calizman",
                    types: ["water","fire", "electric"],
                    pokemons: ["squirtle", "charmander", "pikachu"],
                    rivalPokemons: ["magikarp", "vulpix", "magnamite"],
                    date: "2019-09-15T15:45:03.758Z",
                    win: true
                }                
            }
        }
    }
}
*/
