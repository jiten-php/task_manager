const { Router } = require("express");
const router = Router();

//import controllers
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/task.controller");

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks-status/:id", updateTaskStatus);

module.exports = router;
