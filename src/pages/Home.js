import React from "react";
import { Typography, Container, Box } from "@mui/material";
import todoImage from "../Assets/todo2.png";

const Home = () => {
  return (
    <Container
      sx={{
        mt: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ flex: 1, maxWidth: "50%", pr: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Welcome to Todo-Plus!
        </Typography>

        <Typography variant="body1" sx={{ color: "#424242", mt: 2 }}>
          Todo-Plus is your ultimate task management solution. Organize your
          tasks, set priorities, and track your progress seamlessly. Designed
          with simplicity and efficiency in mind, Todo-Plus helps you stay
          productive and achieve your goals.
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, color: "#424242" }}>
          Please log in to access personalized features such as creating,
          updating, and managing your tasks effectively.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          maxWidth: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 4, sm: 0 },
        }}
      >
        <img
          src={todoImage}
          alt="Task Management Illustration"
          style={{
            width: "100%",
            maxWidth: "400px",
            animation: "float 3s ease-in-out infinite",
          }}
        />
      </Box>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-40px);
            }
          }
        `}
      </style>
    </Container>
  );
};

export default Home;
