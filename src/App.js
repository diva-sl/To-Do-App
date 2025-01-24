import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import InputForm from "./components/InputForm";
import Todo from "./components/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  const addTodos = async (todo) => {
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const completedFlag = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        My Todo App
      </Typography>
      <InputForm addTodos={addTodos} />
      <Todo todos={todos} completedFlag={completedFlag} />
    </Container>
  );
};

export default App;
