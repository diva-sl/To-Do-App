import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { CheckCircle, Edit, Delete, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Todo = ({ isAuthenticated, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editTaskText } : task
      )
    );
    setEditTaskId(null);
    setEditTaskText("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Container
      sx={{
        mt: 4,
        p: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Todo List
      </Typography>

      {/* Add New Task */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4 }}>
        <TextField
          variant="outlined"
          fullWidth
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          startIcon={<Add />}
        >
          Add
        </Button>
      </Box>

      {/* Task List */}
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              backgroundColor: task.completed ? "#e8f5e9" : "#fff",
              borderRadius: "8px",
              mb: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {editTaskId === task.id ? (
              <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => updateTask(task.id)}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={task.text}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#2e7d32" : "#000",
                  }}
                />
                <IconButton
                  onClick={() => toggleComplete(task.id)}
                  color="success"
                >
                  <CheckCircle />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditTaskId(task.id);
                    setEditTaskText(task.text);
                  }}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteTask(task.id)} color="error">
                  <Delete />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>

      {/* Video Section */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          How to Use Todo-Plus
        </Typography>
        <video width="100%" controls>
          <source src="../Assets/todo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Logout */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 4, display: "block", ml: "auto" }}
        onClick={onLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Todo;
