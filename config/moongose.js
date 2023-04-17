const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/social");
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to db"));

db.once("open", function () {
  console.log("Connected to db successfully");
});
