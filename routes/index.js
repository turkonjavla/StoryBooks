const express = require("express"),
      router  = express.Router();

router.get("/", (req, res) => {
    res.send("IT WORKS");
});

router.get("/dashboard", (req, res) => {
    res.send("dashbaord");
});
    

module.exports = router;