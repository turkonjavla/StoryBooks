const express = require("express"),
      router  = express.Router();

// Authentication
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");

// STORIES INDEX
router.get("/", (req, res) => {
    res.render("stories/index");
});

// STORIES NEW
router.get("/new", ensureAuthenticated, (req, res) => {
    res.render("stories/new");
});

// STORIES SHOW
router.get("/:id", (req, res) => {
    res.render("stories/show");
});

router.get("/:id/edit", ensureAuthenticated, (req, res) => {
    res.render("stories/edit");
});

module.exports = router;