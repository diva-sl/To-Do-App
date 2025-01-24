import React from "react";
import { Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">This is the about page.</Typography>
    </Container>
  );
};

export default About;
