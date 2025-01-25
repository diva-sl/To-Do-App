import React from "react";
import { Typography, Container, Box } from "@mui/material";
import { keyframes } from "@mui/system";
import todoImage from "../Assets/todo1.png";

// Define the animation using MUI's `keyframes`
const fadeSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const About = () => {
  return (
    <Container
      sx={{
        mt: 4,
        p: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#37474f",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        About Us
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        {/* Animated Image */}
        <Box
          component="img"
          src={todoImage}
          alt="Todo Management"
          sx={{
            width: { xs: "100%", md: "45%" },
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            animation: `${fadeSlideIn} 1.5s ease-in-out`,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            mt: { xs: 2, md: 0 },
            color: "#455a64",
            lineHeight: 1.6,
            textAlign: "justify",
            flex: 1,
            ml: { md: 3 },
          }}
        >
          Todo-Plus is a cutting-edge task management application developed to
          help users stay organized and productive. Created with modern web
          technologies like React and Material-UI, Todo-Plus offers a seamless
          and user-friendly interface that makes task management effortless.
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#2e7d32",
          }}
        >
          Key Features:
        </Typography>
        <ul style={{ paddingInlineStart: "20px" }}>
          <li>
            <Typography variant="body1" sx={{ color: "#2e7d32" }}>
              Create, update, and delete tasks effortlessly.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#2e7d32" }}>
              Prioritize tasks to focus on what matters most.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#2e7d32" }}>
              Track progress with real-time updates.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#2e7d32" }}>
              User-friendly design with intuitive navigation.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#2e7d32" }}>
              Accessible across multiple devices.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "#fffde7",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#f9a825",
          }}
        >
          Benefits:
        </Typography>
        <ul style={{ paddingInlineStart: "20px" }}>
          <li>
            <Typography variant="body1" sx={{ color: "#f9a825" }}>
              Boost your productivity by staying organized.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#f9a825" }}>
              Achieve your goals with structured task management.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#f9a825" }}>
              Save time with an efficient and intuitive application.
            </Typography>
          </li>
        </ul>
      </Box>

      <Typography
        variant="body1"
        sx={{
          mt: 4,
          color: "#455a64",
          lineHeight: 1.6,
          textAlign: "justify",
        }}
      >
        Whether you are a professional looking to streamline your work or an
        individual seeking better organization, Todo-Plus is here to help you
        achieve more with less effort.
      </Typography>
    </Container>
  );
};

export default About;
