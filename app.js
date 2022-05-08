const bodyParser = require("body-parser")
const express = require("express")

const app = express()
let items = []
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
    res.render("list", {dayOfTheWeek: day, items: items} )
})
app.post("/", function(req,res){
    let item = req.body.newItem
items.push(item)
res.redirect("/")
})
app.listen (3000,function(req,res){
    console.log("hello cutieeeeeee")
})