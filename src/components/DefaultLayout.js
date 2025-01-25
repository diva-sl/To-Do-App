import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../Assets/todo-img.gif";
import { Link } from "react-router-dom";

const DefaultLayout = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#98FB98", // Light green background
      }}
    >
      {/* Custom AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2E8B57", // Darker green
          padding: "0.5rem 1rem",
          borderBottom: "2px solid #ffffff", // White bottom border
        }}
      >
        <Toolbar>
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            style={{ width: 50, height: 40, marginRight: 10 }}
          />

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "1px",
            }}
          >
            Todo-Plus
          </Typography>

          {/* Navigation and Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button component={Link} to="/" sx={{ color: "#ffffff" }}>
              Home
            </Button>
            <Button component={Link} to="/about" sx={{ color: "#ffffff" }}>
              About
            </Button>
            <Button component={Link} to="/todo" sx={{ color: "#ffffff" }}>
              Todo
            </Button>

            {!isLoggedIn ? (
              <>
                <Button
                  component={Link}
                  to="/signin"
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#424242" },
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#424242" },
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={onLogout}
                sx={{
                  fontWeight: "bold",
                  border: "1px solid #ffffff",
                  "&:hover": { backgroundColor: "#ffffff", color: "#2E8B57" },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <main style={{ flex: 1 }}>{children}</main>
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          backgroundColor: "#f1f1f1",
          padding: "1rem",
          mt: "auto",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2">
          © 2025 Todo-Plus. Developed by Diva.
        </Typography>
      </Box>
    </div>
  );
};

export default DefaultLayout;
