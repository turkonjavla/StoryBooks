const passport = require("passport"),
      express = require("express"),
      router = express.Router();

router.get("/google", passport.authenticate("google", 
    {scope: [
        "profile", "email"
    ]
}));

router.get("/google/callback", passport.authenticate("google", {
    failureReddirect: "/"
}), (req, res) => {
    res.redirect("/dashboard");
});

module.exports = router;