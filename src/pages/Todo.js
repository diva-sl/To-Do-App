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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add, CheckCircle, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todo = ({ isAuthenticated, onLogout, userToken }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Select");
  const [dueDate, setDueDate] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/tasks/get-all-tasks",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated, userToken]);

  const addTask = async () => {
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

      try {
        const response = await axios.post(
          "http://localhost:5000/tasks/new-task",
          taskData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setNewTask("");
        setPriority("Low");
        setDueDate("");
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.post(
        "http://localhost:5000/tasks/delete-task",
        { id },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const openEditModal = (task) => {
    setEditTask({
      ...task,
      dueDate: task.dueDate?.split("-").reverse().join("-") || "",
    });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditTask(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTask = async () => {
    if (!editTask.text.trim()) return;
    try {
      await axios.post("http://localhost:5000/tasks/update-task", editTask, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setTasks(
        tasks.map((task) =>
          task._id === editTask._id ? { ...task, ...editTask } : task
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating task", error);
    }
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
      color: priority === "Select" ? "#757575" : "black",
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
                "&.Mui-focused": {
                  color: "black",
                },
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
            <ListItem key={task._id}>
              <ListItemText
                primary={task.text}
                secondary={`Priority: ${task.priority} | Due: ${task.dueDate}`}
              />
              <IconButton
                onClick={() => openEditModal(task)}
                sx={{ color: "#2E8B57" }}
              >
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteTask(task._id)} color="error">
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Dialog
        open={editModalOpen}
        onClose={closeEditModal}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#98FB98",
            color: "Black",
          },
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task"
            name="text"
            value={editTask?.text || ""}
            onChange={handleEditChange}
            sx={{ mb: 2, ...fieldStyles }}
          />
          <FormControl fullWidth sx={{ mb: 2, ...fieldStyles }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={editTask?.priority || ""}
              onChange={handleEditChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            name="dueDate"
            InputLabelProps={{ shrink: true }}
            value={editTask?.dueDate || ""}
            onChange={handleEditChange}
            sx={{ ...fieldStyles }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button
            onClick={updateTask}
            sx={{
              backgroundColor: "#2E8B57",
              color: "black",
              "&:hover": { backgroundColor: "#8FBC8F" },
            }}
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Todo;
