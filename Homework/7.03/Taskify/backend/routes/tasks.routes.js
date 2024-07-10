const express = require("express");
const {
  getUserTasks,
  createTask,
  editTask,
  deleteTask,
  getTaskById,
} = require("../controllers/tasks.controller.js");
const todoRoutes=require("./todos.routes.js")
const router = express.Router();

router.get("/", getUserTasks);
router.get("/:taskId",getTaskById);
router.post("/", createTask);
router.patch("/:taskId", editTask);
router.delete("/:taskId", deleteTask);

router.use("/:taskId/todo",todoRoutes)
module.exports = router;
