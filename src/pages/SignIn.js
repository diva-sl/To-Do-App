import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.token);
        navigate("/");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        p: 4,
        backgroundColor: "#2E8B57",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#ffffff" }}
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: "#98FB98",
            borderRadius: "5px",
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#757575",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
          sx={{
            backgroundColor: "#98FB98",
            borderRadius: "5px",
            input: { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#757575",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            height: "50px",
            backgroundColor: "#98FB98",
            color: "#2E8B57",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#2E8B57",
              color: "#98FB98",
            },
          }}
        >
          Login
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" sx={{ color: "#ffffff" }}>
          Don't have an account?
          <Button
            onClick={() => navigate("/signup")}
            variant="text"
            sx={{
              color: "#98FB98",
              textTransform: "none",
            }}
          >
            Signup
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
