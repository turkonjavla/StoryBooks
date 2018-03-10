const passport = require("passport"),
      express = require("express"),
      router = express.Router();

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

module.exports = router;