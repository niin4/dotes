import React, { useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './containers/Header';
import Menu from './containers/Menu';
import CampaignChooser from './components/CampaignChooser';
import Login from './containers/Login';
import Register from './containers/Register';
import Profile from './containers/Profile';
import { useStore } from './store';
import { LOGIN } from './store/types';
import { decodeUser } from './utils/auth';

const Home = () => <Card><CardContent>Home</CardContent></Card>;
const Notes = () => <Card><CardContent>Notes</CardContent></Card>;
const Journal = () => <Card><CardContent>Journal</CardContent></Card>;


const App = () => {
  const [loading, updateLoading] = useState(true);
  const {state, dispatch } = useStore();

  useEffect(() => {
    if (localStorage.getItem('auth') && !state.loggedIn) {
      console.log('logging in!');
      fetch(`${process.env.REACT_APP_API}/auth/jwt`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth'),
        },
        credentials: 'same-origin',
      }).then((response) => {
        if (!response.status === 200) {
          updateLoading(false);
          localStorage.removeItem('auth');
        }
        return response.json();
      }).then((json) => {
        dispatch({type: LOGIN, user: decodeUser(json.token)});
        localStorage.setItem('auth', json.token);
        updateLoading(false);
      }).catch((err) => {
        updateLoading(false);
      });
    } else {
      updateLoading(false);
    }
  }, []);

  return <Router>
    <Container maxWidth="md">
      {!loading ? <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <CampaignChooser />
        </Grid>
        <Grid item xs={12}>
          <Menu />
        </Grid>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/'><Home /></Route>
            <Route path='/notes'><Notes /></Route>
            <Route path='/journal'><Journal /></Route>
            <Route path='/register'><Register /></Route>
            <Route path='/login'><Login /></Route>
            <Route path='/profile'><Profile /></Route>
          </Switch>
        </Grid>
      </Grid> :
        <div>LOADING, user: {state.user.googleId}</div>}
    </Container>
  </Router>;
};

export default App;
