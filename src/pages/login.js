import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../actions/auth';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Login = props => {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.user);
  console.log('ERRORS', userStore);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch(loginUser({username, password})).then(() => {
          props.history.push('/');
        });
      }}>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={3}>
          <center>
            <h1>Iniciar sesion: </h1>
          </center>
          <div>
            <TextField
              error={userStore && userStore.errors && userStore.errors.username}
              label="Usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
              helperText={
                userStore &&
                userStore.errors &&
                userStore.errors.username &&
                userStore.errors.username[0]
              }
              fullWidth
            />
          </div>
          <br />
          <TextField
            error={userStore && userStore.errors && userStore.errors.password}
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            helperText={
              userStore &&
              userStore.errors &&
              userStore.errors.password &&
              userStore.errors.password[0]
            }
            fullWidth
          />
          {userStore && userStore.errors && userStore.errors.detail && (
            <p>{userStore.errors.detail}</p>
          )}
          <br />
          <center>
            <Button type={'submit'} variant="contained" color="primary">
              Inicia sesion
            </Button>
          </center>
        </Grid>
      </Grid>
    </form>
  );
};
export default Login;
