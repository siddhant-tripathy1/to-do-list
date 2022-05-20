const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/todolistDB" )
const taskSchema = {
    name: String, 
}
const Task = mongoose.model("item", taskSchema)
const Task_1 = new Task ({
    name : "read books "
})
const Task_2 = new Task ({
    name : "Eat clean "
})
const Task_3 = new Task ({
    name : "Pump iron  "
})
const startingTask  = [Task_1, Task_2,Task_3]
Task.insertMany(startingTask, function(err){
    if (err){
        console.log(err)
     } else {
         console.log("yess")
     }

})
const app = express()
let workItem = []
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.get ("/",function(req,res){
    let date = new Date()
    let options = {
        weekday: "long",

        day: "numeric",

        month: "long"
    }

    let day = date.toLocaleDateString("en-US", options)
    res.render("list", {title: day, items: items} )
})
app.get("/work", function(req,res){
    res.render("list",{title:"Work day", items: workItem})

})

app.post("/", function(req,res){
    let item = req.body.newItem
    console.log(req.body.list)
    if(req.body.list === "Work"){
    workItem.push(item)
    res.redirect("/work")
    } else {
        items.push(item)
res.redirect("/")
    }

})
app.listen (3000,function(req,res){
    console.log("hello cutieeeeeee")
})