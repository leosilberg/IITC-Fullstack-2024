const Task = require("../models/task.model.js");

async function updateTaskTodo(req, res) {
  const { taskId, todoId } = req.params;
  const { userId } = req;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId, "todoList._id": todoId },
      { $set: { "todoList.$": req.body } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      console.log(`tasks.controller: no task found`, taskId);
      return res.status(401).json("No task found");
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(`tasks.controller: `, error.message);
    if (error.name === "ValidationError") {
      res.status(400).json(error.message);
    } else {
      res.status(500).json({ message: "Server error while updating todo" });
    }
  }
}

async function addTaskTodo(req, res) {
  const { taskId } = req.params;
  const { userId } = req;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { $push: { todoList: req.body } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      console.log(`tasks.controller: no task found`, taskId);
      return res.status(401).json("No task found");
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(`tasks.controller: `, error.message);
    if (error.name === "ValidationError") {
      res.status(400).json(error.message);
    } else {
      res.status(500).json({ message: "Server error while adding todo" });
    }
  }
}
async function deleteTaskTodo(req, res) {
  const { taskId, todoId } = req.params;
  const { userId } = req;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { $pull: { todoList: { _id: todoId } } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      console.log(`tasks.controller: no task found`, taskId);
      return res.status(401).json("No task found");
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(`tasks.controller: `, error.message);
    if (error.name === "ValidationError") {
      res.status(400).json(error.message);
    } else {
      res.status(500).json({ message: "Server error while adding todo" });
    }
  }
}
module.exports = {
  updateTaskTodo,
  addTaskTodo,
  deleteTaskTodo,
};
