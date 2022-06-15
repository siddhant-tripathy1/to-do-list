const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/todolistDB" )
const taskSchema = {
	name: String, 
}
const listSchema = {
	name: String,
	items: [taskSchema]
}
const List= mongoose.model("List", listSchema)
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
const app = express()
let workItem = []
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.get ("/",function(req,res){
	
	Task.find({}, function(err,found){
		if(found.length === 0){
			Task.insertMany(startingTask, function(err){
				if (err){
					console.log(err)
				 } else {
					 console.log("yess")
				 }
			
			})
			res.redirect("/")
		} else {
		res.render("list", {title:"Today", items: found} )

	}
	})
	// 
})


app.get("/:getRouteParam", function(req,res){
	const customList = req.params.getRouteParam
	List.findOne({name: customList}, function(err,FoundList){
		if(!err){
			if(!FoundList){

				const list = new List({
					name: customList,
					items: startingTask
				})
				list.save()
				res.redirect("/" + customList)
			} else{
				res.render("list", {
					title: FoundList.name,
					items: FoundList.items
				})
				
			}
		}
	})
})
app.post("/delete", function(req,res){
	checkedItemId = req.body.checkbox
	Task.findByIdAndDelete(checkedItemId, function(err){
		if(!err){
                console.log("no error")
		}
	})
	res.redirect("/")
})

app.post("/", function(req,res){
	let newItem = req.body.newItem
	const item = new Task( {
		name : newItem
	})
	item.save()
	res.redirect("/")

})
app.listen (3000,function(req,res){
	console.log("working")
})