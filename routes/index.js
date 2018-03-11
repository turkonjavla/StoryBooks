const mongoose = require("mongoose"),
      express = require("express"),
      router  = express.Router();

// MODELS
const Story = require("../models/Story");

// Authentication
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");

router.get("/", ensureGuest, (req, res) => {
    res.render("index/welcome");
});

// SHOW stories by user
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    let id = {user: req.user.id};

    Story.find(id)
        .sort({date: "desc"})
        .then(stories => {
            res.render("index/dashboard", {stories: stories});
        });

});

router.get("/about", (req, res) => {
    res.render("index/about");
});
    

module.exports = router;