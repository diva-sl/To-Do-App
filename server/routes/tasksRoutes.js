const express = require("express");
const Task = require("../modals/taskModels.js");

const router = express.Router();

// Get all tasks
router.post("/get-all-tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// Create a new task
router.post("/new-task", async (req, res) => {
  try {
    const { text, priority, dueDate } = req.body;

    if (!text || !priority || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = new Task({ text, priority, dueDate });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

// Update a task's completion status
router.put("/update-task/:id", async (req, res) => {
  try {
    const { completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

// Delete a task
router.delete("/delete-task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = router;
