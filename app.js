const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("./connection"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    session = require("express-session"),
    User = require("./models/user")


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = Promise;
//*********************************** ROUTES  ******************************************/

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});

//******************************** AUTH ROUTES ******************************************/
// Show register
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  res.render("login");
});
const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);