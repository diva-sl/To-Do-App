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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Add, CheckCircle, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todo = ({ isAuthenticated, onLogout, userToken }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Select");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  // Fetch tasks on page load and when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post("/api/get-all-tasks", {
          headers: {
            Authorization: `Bearer ${userToken}`, // Pass JWT token for authentication
          },
        })
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tasks", error);
        });
    }
  }, [isAuthenticated, userToken]);

  // Add new task
  const addTask = () => {
    if (!isAuthenticated) {
      alert("Please log in or sign up to save tasks!");
      navigate("/signin");
      return;
    }

    if (newTask.trim()) {
      const taskData = {
        text: newTask,
        priority,
        dueDate,
        completed: false,
      };

      axios
        .post("/api/new-task", taskData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data]);
          setNewTask("");
          setPriority("Low");
          setDueDate("");
        })
        .catch((error) => {
          console.error("Error adding task", error);
        });
    }
  };

  const deleteTask = (id) => {
    axios
      .post(`/api/delete-task/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  const updateTask = (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    axios
      .post(
        `/api/update-task/${id}`,
        { completed: !taskToUpdate.completed },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task", error);
      });
  };

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#2E8B57" },
      "&:hover fieldset": { borderColor: "black" },
      "&.Mui-focused fieldset": { borderColor: "black" },
    },
    "& .MuiInputLabel-root": {
      color: "#757575",
    },
    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
      {
        color: "black",
      },
    "& .MuiSelect-select": {
      color: (theme) => (priority === "Select" ? "#757575" : "black"),
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2E8B57",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Todo List
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4 }}>
          <TextField
            variant="outlined"
            label="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{
              width: "90%",
              flexGrow: 1,
              ...fieldStyles,
            }}
          />
          <FormControl
            sx={{
              minWidth: "20%",
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2E8B57",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiSelect-select": {
                color: priority === "Select" ? "#757575" : "black",
              },
            }}
          >
            <InputLabel
              id="priority-label"
              sx={{
                color: priority === "Select" ? "#757575" : "black",
              }}
            >
              Priority
            </InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="priority"
              labelId="priority-label"
              displayEmpty
            >
              <MenuItem value="Select" disabled>
                Select Priority
              </MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ width: "20%", flexGrow: 1, ...fieldStyles }}
          />
          <Button
            variant="contained"
            onClick={addTask}
            startIcon={<Add />}
            sx={{
              width: "10%",
              height: "56px",
              backgroundColor: "#2E8B57",
              "&:hover": { backgroundColor: "green" },
              flexGrow: 1,
            }}
          >
            Add
          </Button>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.text}
                secondary={`Priority: ${task.priority} | Due: ${task.dueDate}`}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
              <IconButton onClick={() => updateTask(task.id)} color="success">
                <CheckCircle />
              </IconButton>
              <IconButton onClick={() => deleteTask(task.id)} color="error">
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Todo;
