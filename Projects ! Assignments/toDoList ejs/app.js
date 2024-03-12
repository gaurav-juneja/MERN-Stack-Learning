const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//GET function for home route
app.get("/", function (req, res) {
  res.render("list", { listTitle: "To Do List", newListItems: items });
});

//POST function for home route
app.post("/", function (req, res) {
  const item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
