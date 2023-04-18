const express = require("express");

const db = require("./config/moongose");
const User = require("./models/user");
const expressLayouts = require("express-ejs-layouts");
const PORT = 8080;

const app = express();

app.use(express.urlencoded());
app.use(expressLayouts);
app.use(express.static("assets"));
app.use("/", require("./routes"));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, function (err) {
  if (err) {
    console.log("Unable to start server, Please try again!");
    return;
  }

  console.log(`Server is UP & RUNNING on port: ${PORT}`);
});
