import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authBg from "../assets/nature1.jpg";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();

  const [formState, setFormState] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const navigate = useNavigate();

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        // ✅ ensure token exists
        if (result?.token) {
          localStorage.setItem("token", result.token);
          navigate("/home"); // or "/home"
        }
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let message = err.response.data.message;
      setError(message);
    }
  };

  return (
  <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      {/* LEFT IMAGE */}
      <Grid
        item
        xs={0}
        sm={4}
        md={7}
        sx={{
          display: { xs: "none", sm: "block" },
          backgroundImage: `url(${authBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* RIGHT FORM */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={10}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            px: 4,
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              mb: 1,
              bgcolor: "primary.main",
              width: 48,
              height: 48,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5" fontWeight={600}>
            {formState === 0 ? "Welcome Back" : "Create Account"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {formState === 0
              ? "Sign in to continue"
              : "Register to get started"}
          </Typography>

          {/* TOGGLE */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, width: "100%" }}>
            <Button
              fullWidth
              variant={formState === 0 ? "contained" : "outlined"}
              onClick={() => setFormState(0)}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant={formState === 1 ? "contained" : "outlined"}
              onClick={() => setFormState(1)}
            >
              Sign Up
            </Button>
          </Box>

          {/* FORM */}
          <Box component="form" noValidate sx={{ width: "100%" }}>
            {formState === 1 && (
              <TextField
                margin="normal"
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              margin="normal"
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 1 }}
              >
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
              }}
              onClick={handleAuth}
            >
              {formState === 0 ? "LOGIN" : "REGISTER"}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>

    <Snackbar open={open} autoHideDuration={4000} message={message} />
  </ThemeProvider>
);
}
