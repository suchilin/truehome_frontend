import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './pages/login';
import isEmpty from 'lodash.isempty';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from './actions/auth';
import ListOfLands from './pages/lands';
import AddLand from './pages/addLand';
import {Button} from '@material-ui/core';

const PrivateRoute = ({component: Component, ...rest}) => {
  const userStore = useSelector(state => state.user);

  return (
    <Route
      {...rest}
      render={props => {
        let access_token = userStore.token;
        if (isEmpty(access_token)) {
          return <Redirect to={'/login'} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default function App() {
  const userStore = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <Router>
      <div>
        {userStore && userStore.token && (
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              e.preventDefault();
              dispatch(logoutUser());
            }}>
            Log Out
          </Button>
        )}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/nuevoterreno" component={AddLand} />
          <PrivateRoute path="/editarterreno/:id" component={AddLand} />
          <PrivateRoute path="/" component={ListOfLands} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
