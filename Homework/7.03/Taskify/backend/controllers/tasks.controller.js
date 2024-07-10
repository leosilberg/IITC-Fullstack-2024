const Task = require("../models/task.model.js");

async function getUserTasks(req, res) {
  const { userId } = req;
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(`tasks.controller: `, error.message);
    res.status(500).json("Server error getting user tasks");
  }
}

async function getTaskById(req, res) {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    res.status(200).json(task);
  } catch (error) {
    console.log(`tasks.controller: `, error.message);
    res.status(500).json("Server error getting task");
  }
}

async function createTask(req, res) {
  console.log(`tasks.controller: `,req.body);
  const { userId } = req;
  try {
    const newTask = new Task({ ...req.body, user: userId });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.log(`tasks.controller: `, error.message);
    if (error.name === "ValidationError") {
      res.status(400).json(error.message);
    } else {
      res.status(500).json("Server error while creating task");
    }
  }
}

async function editTask(req, res) {
  const { userId } = req;
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      req.body,
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
      res.status(500).json({ message: "Server error while updating task" });
    }
  }
}

async function deleteTask(req, res) {
  const { userId } = req;
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: userId,
    });

    if (!deletedTask) {
      console.log(`tasks.controller: no task found`, taskId);
      res.status(404).json("No task found");
    }
    res.status().json("Task deleted succesfuly");
  } catch (error) {
    console.log(`tasks.controller: `, error.message);
    res.status(500).json("Server error deleting task");
  }
}

module.exports = {
  getUserTasks,
  createTask,
  editTask,
  deleteTask,
  getTaskById,
};
