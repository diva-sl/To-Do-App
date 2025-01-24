import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Todo = ({ todos, completedFlag }) => {
  return (
    <List sx={{ margin: "20px 0" }}>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="complete"
              onClick={() => completedFlag(todo.id)}
            >
              <CheckIcon />
            </IconButton>
          }
        >
          <ListItemText primary={todo.todoVal} />
        </ListItem>
      ))}
    </List>
  );
};

export default Todo;
