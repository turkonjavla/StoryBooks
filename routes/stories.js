const express = require("express"),
      router  = express.Router();

// MODELS
const Story = require("../models/Story");

// Authentication
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");

// STORIES INDEX
router.get("/", (req, res) => {
    Story.find({status: "public"})
        .populate("user")
        .then(stories => {  
            res.render("stories/index", {stories: stories});
        });

});

// STORIES NEW
router.get("/new", ensureAuthenticated, (req, res) => {
    res.render("stories/new");
});

// STORIES CREATE
router.post("/", ensureAuthenticated, (req, res) => {
    let allowComments;

    if(req.body.allowComments) {
        allowComments = true
    }
    else {
        allowComments = false;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    // CREATE story
    Story.create(newStory)
        .then(story => {
            res.redirect(`/stories/${story.id}`);
        })
        .catch(err => console.log(err));
});

// STORIES SHOW
router.get("/:id", (req, res) => {
    res.render("stories/show");
});

router.get("/:id/edit", ensureAuthenticated, (req, res) => {
    res.render("stories/edit");
});

module.exports = router;