const express= require("express");
const app=express();
const cors=require("cors")
app.use(express.json());
const {createTodo, updateTodo}= require('./types');
const { todo } = require("./db");
app.options('*', cors()); // Enable pre-flight for all routes


app.use(cors({
    origin: "http://localhost:5173"
}));
app.post("/todo", async function(req, res){
    const createPayLoad= req.body;
    const parsedPayLoad= createTodo.safeParse(createPayLoad);
    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "You have sent the wrong inputs"
        })
        return;
    }
    //If everything is fine forward it todo to MongoDB

    //await with the async function helps when a data base is done, usually the databases are not down.
    await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed: false,
    })
    res.json({
        msg:"todo created"
    })
})

app.get("/todos", async function(req,res){
    //We have to await the todos coming from the database.
    //After all the Todos are retrived then do the operation.
    const todos =await todo.find({})
    res.json({
        todos
    })
})

app.put("/completed",async function(req, res){
    const updatePayLoad=req.body;
    const parsedPayLoad= updateTodo.safeParse(updatePayLoad);
    if(!parsedPayLoad.success){
        res.status(411).json({
            msg: "You have sent wrong inputs"
        })
        return;
    }

    await todo.updateOne({
        id: req.body.id
    },{
        completed: true
    })
    res.json({
        msg: "Todo marked completed"
    })
})
app.use(express.json())
app.listen(3000)
