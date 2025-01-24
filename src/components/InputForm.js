import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const InputForm = ({ addTodos }) => {
  const [todoString, setTodoString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoString === "") {
      alert("Please enter a To-do");
      return;
    }
    const todo = {
      todoVal: todoString,
      id: uuidv4(),
    };
    addTodos(todo);
    setTodoString("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", alignItems: "center", mb: 2 }}
    >
      <TextField
        variant="outlined"
        label="Enter To-do"
        value={todoString}
        onChange={(e) => setTodoString(e.target.value)}
        fullWidth
        sx={{ mr: 1 }} // Margin right for spacing
      />
      <Button type="submit" variant="contained" color="warning">
        Add
      </Button>
    </Box>
  );
};

export default InputForm;
