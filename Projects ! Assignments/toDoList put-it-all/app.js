//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    res.render("list", { listTitle: "To Do List", newListItems: foundItems });
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  item.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("Server has started in port 3000 successfully");
});
