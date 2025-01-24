// src/components/DefaultLayout.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../Assets/todo-img.gif";

const DefaultLayout = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
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

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About
            </Button>
            <Button component={Link} to="/todo" color="inherit">
              Todo
            </Button>

            {/* Sign In and Sign Up Buttons */}
            {!isLoggedIn ? (
              <>
                <Button
                  component={Link}
                  to="/signin"
                  sx={{
                    backgroundColor: "#ff4081",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#e91e63" },
                    fontWeight: "bold",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    backgroundColor: "#00e676",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#00c853" },
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
                  "&:hover": { backgroundColor: "#ffffff", color: "#1976d2" },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer */}
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
