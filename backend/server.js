// using Express
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// create an Instance of express
const app = express()
app.use(express.json())
app.use(cors())
//sample in-memory storage for todo items
// let todos = [];

mongoose.connect('mongodb://localhost:27017/ToDo-datas')
    .then(() => {
        console.log('DB Connected!')
    })
    .catch((err) => {
        console.log(err)
    })

    // creating schema 
const todoSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    description: String
})

// creating model
const todoModel = mongoose.model('Todo', todoSchema)

// create a new todo item
app.post('/todos', async (req, res) => {
    const { title, description } = req.body

    // const newTodo = {
    //     id : todos.length + 1,
    //     title,
    //     description
    // }
    // todos.push(newTodo)
    // console.log(todos)

    try {
        const newTodo = new todoModel({ title, description })
        await newTodo.save()
res.status(201).json({
  success: true,
  message: "Item Successfully Added!",
  todo: newTodo
});    } catch (error) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
})

//Get all Items
app.get('/todos', async(req, res) => {
    try {
        const newTodo = await todoModel.find()
        res.status(200).json(newTodo)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
})

//Get single Item
app.get('/todo/:id', async(req, res) => {
    try {
    const id = req.params.id
    if(!id) {
        return res.status(404).json({message : "Bad Request"})
    }
    const getId = await todoModel.findById(id)
    if(getId == null){
       return res.status(404).json({message : "Invalid Id"}) 
    }
    res.status(200).json(getId)        
    } catch (error) {
     res.status(400).json({message : error.message})   
    }
})

// Update a TODO Item
app.put("/todo/:id", async(req,res) => {
    try {
    const {title, description} = req.body
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
    id,
    { title, description},
    {new : true}
    )
    if (!updatedTodo){
        return res.status(404).json({message : "Todo not found"})
    }
    res.json(updatedTodo)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
})

// Delete a todo item
app.delete("/todo/:id", async(req, res) => {
    try{
    const id = req.params.id
    const deleted = await todoModel.findByIdAndDelete(id)
    if(!deleted){
        return res.status(404).json({message : "Todo Not found"})
    }
    res.status(201).json({message : "Item Successfully removed!"})
    }
    catch(error){
    res.status(500).json({messsage : error.message})
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log("server Listening to Port +", PORT)
})