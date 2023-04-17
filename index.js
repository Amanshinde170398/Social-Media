const express = require("express");
const db = require("./config/moongose");

const PORT = 8080;

const app = express();

app.use("/", require("./routes"));
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(PORT, function (err) {
  if (err) {
    console.log("Unable to start server, Please try again!");
    return;
  }

  console.log(`Server is UP & RUNNING on port: ${PORT}`);
});