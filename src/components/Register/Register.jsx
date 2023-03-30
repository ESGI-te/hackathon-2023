import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  divider: {
    margin: theme.spacing(2)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(3)
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%'
  }
}));

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Registering user:', username, password);
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h2">
              Register
            </Typography>
            <Divider className={classes.divider} />
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                required
                id="username"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classes.textField}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.textField}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.textField}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h2">
              Already have an account?
            </Typography>
            <Divider className={classes.divider} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              className={classes.textField}
            >
              Login
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
