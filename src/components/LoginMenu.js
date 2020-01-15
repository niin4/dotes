import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { useStore } from '../store';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function logOut() {
  window.localStorage.removeItem('auth');
  window.location.replace(`${process.env.REACT_APP_API}/auth/logout`);
}

const LoginMenu = () => {
  const { state } = useStore();

  return state.loggedIn ? <Fragment>
    <Link to='/profile'><Button color="secondary">{state.user.name ? state.user.name : 'profile'}</Button></Link>
    <Button color="primary" onClick={logOut}>Logout</Button>
  </Fragment> :
    <Button color="primary" href={`${process.env.REACT_APP_API}/auth/google`}>
      Login
    </Button>;
};

export default LoginMenu;
