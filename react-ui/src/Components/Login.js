import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    axios
      .post("/newuser", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          // in here we can set the token in local storage which can then be sent in the authorization header for the future requests and will then let us see the privatepage
          const token = response.data.token;
          window.localStorage.setItem("AuthToken", token);
          window.location.reload();
        },
        (error) => {
          alert(error.response.data);
        }
      );
  };

  const handleLogin = (event) => {
    event.preventDefault();
    //   take the state and post a request to the backend with the details
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          // in here we can set the token in local storage which can then be sent in the authorization header for the future requests and will then let us see the privatepage
          const token = response.data.token;
          window.localStorage.setItem("AuthToken", token);
          window.location.reload();
        },
        (error) => {
          alert(error.response.data);
        }
      );
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            id="logInButton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}>
            Log In
          </Button>
          <Button
            id="registerButton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}>
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
