const express=require("express")
const { addTaskTodo, updateTaskTodo, deleteTaskTodo } = require("../controllers/todos.controller.js")
const router=express.Router({mergeParams: true})

router.post("/",addTaskTodo)
router.patch("/:todoId",updateTaskTodo)
router.delete("/:todoId",deleteTaskTodo)
module.exports=router