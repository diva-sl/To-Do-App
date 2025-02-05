import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../Assets/todo-img.gif";
import { ExitToApp, Login, PersonAdd } from "@mui/icons-material";

function DefaultLayout({ children, isLoggedIn, onLogout }) {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarColor, setAvatarColor] = useState("#555");
  const [avatarInitial, setAvatarInitial] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || "User");
      setAvatar(user.avatar);
      setAvatarColor(user.avatarColor || "#555");
      setAvatarInitial(
        user.avatarInitial || user.name?.charAt(0).toUpperCase()
      );
    }
  }, [isLoggedIn]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#98FB98",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2E8B57",
          padding: "0.5rem 1rem",
          borderBottom: "2px solid #ffffff",
        }}
      >
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 50, height: 40, marginRight: 10 }}
          />
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

          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              gap: 3,
            }}
          >
            <Button component={Link} to="/" sx={{ color: "#ffffff" }}>
              Home
            </Button>
            <Button component={Link} to="/about" sx={{ color: "#ffffff" }}>
              About
            </Button>
            <Button component={Link} to="/todo" sx={{ color: "#ffffff" }}>
              Todo
            </Button>
          </Box>

          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/signin"
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&:hover": {
                    backgroundColor: "#333",
                    transform: "scale(1.02)",
                  },
                  transition: "transform 0.2s ease, background-color 0.3s",
                }}
                endIcon={<Login />}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&:hover": {
                    backgroundColor: "#333",
                    transform: "scale(1.02)",
                  },
                  transition: "transform 0.2s ease, background-color 0.3s",
                  marginLeft: "20px",
                }}
                endIcon={<PersonAdd />}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="User Avatar"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    border: "1.5px solid #fff",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    backgroundColor: avatarColor,
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1.5px solid #fff",
                  }}
                >
                  {avatarInitial}
                </Avatar>
              )}

              <Typography
                sx={{
                  color: "#D3D3D3",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textTransform: "capitalize",
                }}
              >
                Hi, {userName}
              </Typography>
              <Button
                color="inherit"
                onClick={onLogout}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "black",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  "&:hover": {
                    backgroundColor: "#333",
                    transform: "scale(1.02)",
                  },
                  transition: "transform 0.2s ease, background-color 0.3s",
                  marginLeft: "70px",
                }}
              >
                Exit
                <ExitToApp sx={{ fontSize: "20px" }} />
              </Button>
            </Box>
          )}
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
}

export default DefaultLayout;
