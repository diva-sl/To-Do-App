require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/usersRoutes.js");
const taskRoute = require("./routes/tasksRoutes.js");

const app = express();
// MongoDB Connection
mongoose
  .connect(process.env.mongo_url)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log("MongoDB connection failed:", err));

// Middleware
// app.use(
//   cors({
//     origin: "https://.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/users", userRoute);
app.use("/tasks", taskRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
