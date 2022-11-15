const express = require("express");
const apiRouter = require("./api");
const pageRouter = require("./pages");

const router = express.Router();

router.use("/api", apiRouter);
router.use(pageRouter);

module.exports = router;
