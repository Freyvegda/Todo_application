const mongoose= require("mongoose") 
mongoose.connect("mongodb+srv://frey:FreyVegda@cluster0.xsu91.mongodb.net/")

const todoSchema=mongoose.Schema({
    title: String,
    description: String, 
    completed: Boolean
})

const todo=mongoose.model('todos', todoSchema);
module.exports= {
    todo
}