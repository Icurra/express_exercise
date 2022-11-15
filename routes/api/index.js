const express = require("express");
const { readFile, writeFile, write } = require("fs");
const { join } = require("path");
const pokeFile = join(__dirname, "../../public/pokemon.json");

const router = express.Router();

router.get("/test", (req, res, next) => {
  try {
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get("/pokemon", (req, res, next) => {
  const { name, num } = req.query;

  if (name || num) {
    try {
      readFile(pokeFile, (err, contents) => {
        let { pokemon } = JSON.parse(contents.toString());

        let foundPokemon = pokemon.find(
          (p) => p.name?.toLowerCase() == name?.toLowerCase() || p.num == num
        );

        res.json(
          foundPokemon || {
            msg: `No pokemon exists with name =${name} or id = ${id}.`,
          }
        );
      });
    } catch (err) {
      next(err);
    }
  } else {
    try {
      res.sendFile(pokeFile);
    } catch (err) {
      next(err);
    }
  }
});

router.post("/pokemon", (req, res, next) => {
  let newPokemon = req.body;
  try {
    readFile(pokeFile, (err, contents) => {
      if (err) {
        next(err);
      } else {
        let { pokemon } = JSON.parse(contents.toString());

        let newId = newPokemon.id = pokemon[pokemon.length - 1].id + 1;
        newPokemon.id = newId;
        newPokemon.num = String(pokemon[pokemon.length - 1].id + 1).padStart(3, "0");

        pokemon.push(newPokemon);

        writeFile(pokeFile, JSON.stringify({pokemon}), err => {
            if (err) {
                next (err)
            } 
            res.json({msg:`Successfully added new pokemon to list`, insertedId: newId})
        })
      }
    });
  } catch (err) {
    next(err);
  }
});

router.put("/pokemon", (req, res, next) => {
  let updatedDetails = req.body;
  let { id } = req.body;

  if (isNaN(parseInt(id))) {
    res
      .status(400)
      .json({ msg: `Invalid request. You must provide a valid Pokemon ID.` });
  }

  try {
    readFile(pokeFile, (err, contents) => {
      if (err) {
        next(err);
      }

      let { pokemon } = JSON.parse(contents.toString());
      let updatedPokemon = pokemon.map((p) => {
        if (p.id == id) {
          p = { ...p, ...updatedDetails };
        }
        return p;
      });

      writeFile(
        pokeFile,
        JSON.stringify({ pokemon: updatedPokemon }),
        (err) => {
          if (err) {
            next(err);
          }

          res.json({ msg: `Successfully updated pokemon with id ${id}.` });
        }
      );
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/pokemon", (req, res, next) => {
  let { id } = req.query;

  if (isNaN(parseInt(id)))
    res
      .status(400)
      .json({ msg: "Invalid request. You must provide a valid Pokemon ID." });

  try {
    readFile(pokeFile, (err, contents) => {
      let pokemon = JSON.parse(contents.toString());

      let filteredPokemon = pokemon.filter((p) => p.id != id);
      writeFile(
        pokeFile,
        JSON.stringify({ pokemon: filteredPokemon }),
        (err) => {
          if (err) {
            next(err);
          } else {
            res.json({ msg: `Successfully pokemon with id ${id}` });
          }
        }
      );
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
