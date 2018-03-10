const mongoose = require("mongoose"),
      passport = require("passport"),
      express  = require("express"),
      app      = express(),
      port     = process.env.PORT || 5050;

// DB connection
/* const db = process.env.DATABASEURL;
mongoose.connect(db)
    .then(() => consolellog("MongoDB connected!"))
    .catch(err => console.log(`Error ${err}`));
 */

 // PASSPORT CONFIG
 require(".//config/passport")(passport);

// LOAD ROUTES
const auth = require("./routes/auth");

app.get("/", (req, res) => {
    res.send("IT WORKS");
});

// ROUTES
app.use("/auth", auth);

app.listen(port, process.env.IP, () => {
    console.log(`Server open at port: ${port}`);
});