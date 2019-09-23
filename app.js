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

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = Promise;
//*********************************** ROUTES  ******************************************/

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});

//******************************** AUTH ROUTES ******************************************/
// Show register
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  console.log("The post register route has been called");  
  User.register({username: req.body.user.username}, req.body.user.password, (err, user)=>{
      if(err){
        console.log(err);
        return res.render("register-error", {err:err});
      }
      else{
          passport.authenticate("local")(req,res, ()=>{
              res.redirect("/secret");
          })
      }
  })
});
/*******************************LOGIN ROUTES ***********************************************/
app.get("/login", (req, res) => {
  res.render("login");
});
// injected middleware, that defines the course of action upon success and failure
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
});

/*****************************************LOGOUT ROUTES ************************************/
app.get("/logout", (req, res) => {
  req.logOut();  
  res.redirect("/");
});

/******************************************* WRITING MIDDLEWARE TO LOCKDOWN /SECRET ROUTE**********************************/
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);