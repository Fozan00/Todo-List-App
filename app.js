const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
    console.log("Server running at port 3000.");
})

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
app.get("/fazool", function (req, res) {
    res.send(items[items.length-1]);

});
app.get("/", function (req, res) {
    let day = date.getDate();
    res.render("list", { kindOfDay: day, listItems: items, itemsLength: items.length });

});



app.get("/work", function (req, res) {
   
    res.render("list", { kindOfDay: "Work List", listItems: workItems, itemsLength: workItems.length });
})


app.post("/", function (req, res) {
    let item = req.body.newItem;

    if(req.body.button1 === "Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");
    }
    
})
app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
    
})

app.get("/about", function (req, res) {
    res.render("about");
})