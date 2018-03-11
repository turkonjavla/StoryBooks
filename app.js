const cookieParser = require("cookie-parser"),
      mongoose     = require("mongoose"),
      passport     = require("passport"),
      session      = require("express-session"),
      moment       = require("moment"),
      express      = require("express"),
      exphbs       = require("express-handlebars"),
      keys         = require("./config/keys"),
      app          = express(),
      port         = process.env.PORT || 5050;

// DB connection
const db = keys.mongoURI;
mongoose.connect(db)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(`Error ${err}`));
 
app.use(cookieParser());
app.use(session({
    secret: "elilie",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + "/public"));

// PASPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// GLOBALS
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
app.locals.moment = moment(new Date).format("YYYY");

 // PASSPORT CONFIG
 require("./config/passport")(passport);

// HANDLEBARS
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// LOAD ROUTES
const auth = require("./routes/auth"),
      index = require("./routes/index"),
      stories = require("./routes/stories");

// ROUTES
app.use("/", index);
app.use("/auth", auth);
app.use("/stories", stories);


app.listen(port, process.env.IP, () => {
    console.log(`Server open at port: ${port}`);
});