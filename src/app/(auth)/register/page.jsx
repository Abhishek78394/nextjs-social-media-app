"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RegisterApi } from "@/store/api/authApi";
import { RegisterUser } from "@/store/actions/authAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { receivedError, requestSent, responseReceived } from "@/store/utilsActions";
import { Alert } from "@mui/material";

const defaultTheme = createTheme();

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = React.useState();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const userDetails = {
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password")
      };
      dispatch(requestSent());

      const response = await RegisterApi(userDetails);
      dispatch(RegisterUser(response));

      dispatch(responseReceived());

      router.push("/");
    } catch (error) {
      console.log("Login Page error::", error);
      setError(error.data.error);
      dispatch(receivedError(error));
      dispatch(responseReceived());
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Page;
