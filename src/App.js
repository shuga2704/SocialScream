import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
// Components
import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west1-social-media-d2540.cloudfunctions.net/api';

const token = localStorage.FBIDToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={Home}
              />
              <AuthRoute
                exact
                path="/login"
                component={Login}
              />
              <AuthRoute
                exact
                path="/signup"
                component={Signup}
              />
              <Route
                exact
                path="/users/:handle"
                component={User}
              />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={User}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
