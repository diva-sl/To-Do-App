import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/signin",
        inputs,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const textFieldStyles = {
    backgroundColor: "#98FB98",
    borderRadius: "5px",
    input: { color: "black" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "black" },
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
          value={inputs.email}
          onChange={handleChange}
          required
          sx={textFieldStyles}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={inputs.password}
          onChange={handleChange}
          required
          sx={textFieldStyles}
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
          SignIn
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

export default SignIn;
