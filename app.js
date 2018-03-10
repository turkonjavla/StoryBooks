const mongoose = require("mongoose"),
      express  = require("express"),
      app      = express(),
      port     = process.env.PORT || 5050;

// DB connection
const db = process.env.DATABASEURL;
mongoose.connect(db)
    .then(() => consolellog("MongoDB connected!"))
    .catch(err => console.log(`Error ${err}`));

app.get("/", (req, res) => {
    res.send("IT WORKS");
});

app.listen(port, process.env.IP, () => {
    console.log(`Server open at port: ${port}`);
});