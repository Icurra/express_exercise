const fetch = require("isomorphic-fetch");
const { writeFile } = require("fs");

fetch ("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
.then((res) => res.text())
.then((data) => {
    writeFile("./public/pokemon.json", data, (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("Successfully caught pokemon");
        }
    });
});