import React from "react";
import { Typography, Container } from "@mui/material";

const Todo = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Typography variant="body1">This is the todo page.</Typography>
    </Container>
  );
};

export default Todo;
