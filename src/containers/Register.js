import React, { useEffect } from 'react';
import { useStore } from '../store';
import { LOGIN } from '../store/types';
import jwt_decode from 'jwt-decode';
import { useInput } from '../utils/forms';
import { Card, CardContent, Typography, TextField } from '@material-ui/core';

const Register = () => {
  const {state, dispatch } = useStore();
  const [name, setName] = useInput('');

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get('token');
    if (token && !state.loggedIn) {
      console.log('logging in');
      const decoded = jwt_decode(token);
      localStorage.setItem('auth', token);
      dispatch({type: LOGIN, user: decoded.user});
    }
  }, []);

  return <Card>
    <CardContent>
      <Typography variant='body1'>
      Welcome~ Here you can set up your info.
      </Typography>
      <TextField
        autoComplete="off"
        id="name"
        label="Name"
        value={name}
        onChange={setName}
        margin="normal"
        variant="outlined"
      />
    </CardContent>
  </Card>;
};

export default Register;

