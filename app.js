const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require("mongoose"); 


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true}); 

const itemSchema = {
    name : String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name : "Welcome to your todoList"
}); 
const item2 = new Item({
    name : "Hit + button "
}); 
const item3 = new Item({
    name : "Mutton + Hit + button "
}); 

const defaultItems = [item1, item2, item3];
Item.insertMany(defaultItems, function(err){
    if(err)
        console.log(err); 
    else{
        console.log("success"); 
    }
})

app.get("/", function(req, res){

    Item.find({}, function(err, foundItems){
        res.render('list', { listTitle: "Today", newListItems: foundItems });
    }); 
})

app.post('/' , function(req, res){
    //console.log(req.body);
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work');
    }else {
        items.push(Item);
        res.redirect('/');
    }
})

app.get('/work', function(req, res){
    res.render('list', {listTitle: "Work", newListItems: workItems});
})

app.post('/work', function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});


app.get('/about', function(req, res){
    res.render("about");
})

app.listen(3000, function(){
    console.log("server started at port 3000");
})
