import React from "react";
import { Typography, Container, Box } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to MyAppName!
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Please log in to access more features.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
