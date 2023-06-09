const express = require("express");

const db = require("./config/moongose");
const User = require("./models/user");
const localStrategy = require("./config/passport-local-strategy");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const MongoStore = require("connect-mongo");

const passport = require("passport");
const passportLocal = require("passport-local");

const PORT = 8080;

const app = express();

app.use(express.urlencoded());
app.use(expressLayouts);
app.use(express.static("assets"));
app.use(cookieParser());

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in db
app.use(
  session({
    name: "social-media",
    secret: "blahsomething",
    resave: false,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // store: MongoStore.create(
    //   {
    //     mongooseConnection: db,
    //     autoRemove: "disabled",
    //   },
    //   function (err) {
    //     console.log(err || "connect-mongo db setup ok");
    //   }
    // ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes"));
app.listen(PORT, function (err) {
  if (err) {
    console.log("Unable to start server, Please try again!");
    return;
  }

  console.log(`Server is UP & RUNNING on port: ${PORT}`);
});
