const express = require("express"),
      router  = express.Router();

router.get("/", (req, res) => {
    res.render("index/welcome");
});

router.get("/dashboard", (req, res) => {
    res.send("dashbaord");
});
    

module.exports = router;