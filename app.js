var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var db = require("./config/DBConnect");
var user = require("./model/user");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articleRouter = require("./routes/article");
var collectionRouter = require("./routes/collections");
var compression = require("compression");
var forceDomain = require("forcedomain");
const bodyParser = require('body-parser')
const session = require('express-session')
var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var User = require('./model/user')
var app = express();
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://rodgersj097:OAo8RQYjmMWycs79@cluster0-bronw.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//compression 
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//set default folder
app.use(express.static(path.join(__dirname, "public")));
//set up www and https redirects
app.all("*", require("express-force-domain")("http://www.mhcm.ca"));
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
app.use(requireHTTPS);
//set up passport auth 
app.use(
  session({
    secret: 'fhrharhahdfhdfh',
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  next()

})
app.use((req, res, next) => {
  res.locals.user = req.user
  next()

})
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//setup routers 
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/blog/collections", collectionRouter);
app.use("/blog", articleRouter);
app.use("/user", usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
