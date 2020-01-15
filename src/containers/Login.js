import React, { useEffect } from 'react';
import { useStore } from '../store';
import { LOGIN } from '../store/types';
import jwt_decode from 'jwt-decode';
import { Card, CardContent, Typography } from '@material-ui/core';

const Login = () => {
  const {state, dispatch } = useStore();

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get('token');
    if (token && !state.loggedIn) {
      console.log('logging in');
      const decoded = jwt_decode(token);
      console.log(decoded);
      localStorage.setItem('auth', token);
      dispatch({type: LOGIN, user: decoded.user});
    }
  }, []);

  return <Card>
    <CardContent>
      <Typography variant='body1'>
    Welcome user: {state.user.googleId}.
    You would be redirected, if we had such functionality.
      </Typography>
    </CardContent>
  </Card>;
};

export default Login;

