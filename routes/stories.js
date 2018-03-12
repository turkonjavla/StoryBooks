const express = require("express"),
      router  = express.Router();

// MODELS
const Story = require("../models/Story");

// Authentication
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");

// INDEX
router.get("/", (req, res) => {
    Story.find({status: "public"})
        .sort({date: "desc"})
        .populate("user")
        .then(stories => {  
            res.render("stories/index", {stories: stories});
        });
});

// NEW
router.get("/new", ensureAuthenticated, (req, res) => {
    res.render("stories/new");
});

// CREATE
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

    Story.create(newStory)
        .then(story => {
            res.redirect(`/stories/${story.id}`);
        })
        .catch(err => console.log(err));
});

// SHOW
router.get("/:id", (req, res) => {
    let id = req.params.id;

    Story.findById(id)
        .populate("user")
        .populate("comments.commentUser")
        .then(story => {
            res.render("stories/show", {story: story});
        });
});


// EDIT
router.get("/:id/edit", ensureAuthenticated, (req, res) => {
    let id = req.params.id;

    Story.findById(id)
        .populate("user")
        .then(story => {
            res.render("stories/edit", {story: story});
        });
});

// UPDATE
router.put("/:id", ensureAuthenticated, (req, res) => {
        Story.findOne({
            _id: req.params.id
        })
            .then(story => {
                let allowComments;

                if(req.body.allowComments) {
                    allowComments = true
                }
                else {
                    allowComments = false;
                }

                story.title = req.body.title;
                story.status = req.body.status;
                story.allowComments = allowComments;
                story.body = req.body.body;

                story.save()
                    .then(() => {
                        res.redirect("/stories/" + req.params.id);
                    })
                    .catch(err => console.log(err));
            });
});

// DELETE
router.delete("/:id", ensureAuthenticated, (req, res) => {
    let id = req.params.id;

    Story.findByIdAndRemove(id)
        .then(() => {
            res.redirect("/dashboard");
        });
});

// ADD COMMENT
router.post("/:id/comment", ensureAuthenticated, (req, res) => {
    Story.findOne({_id: req.params.id})
        .then(story => {
                const newComment = {
                    commentBody: req.body.commentBody,
                    commentUser: req.user.id
                }
                // push to comments array 
                story.comments.unshift(newComment)
                    story.save()
                    .then(story => {
                        res.redirect("/stories/" + req.params.id);
                    });
        });
});

module.exports = router;