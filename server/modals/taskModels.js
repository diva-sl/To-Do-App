const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
