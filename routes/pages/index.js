const express = require("express");
const {join} = require("path")

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.sendFile(join(__dirname, "../../public/index.html"));
  } catch (err) {
    next(err);
  }
});

router.get("/pokemon", (req, res, next) => {
    try {
      res.sendFile(join(__dirname, "../../public/pokemon.html"));
    } catch (err) {
      next(err);
    }
  });

  router.get("/newsletter", (req, res, next) => {
    try {
      res.sendFile(join(__dirname, "../../public/newsletter.html"));
    } catch (err) {
      next(err);
    }
  });

module.exports = router;