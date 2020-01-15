import React, { useState, Fragment } from 'react';
import { useStore } from '../store';
import { LOGIN } from '../store/types';

import { useInput } from '../utils/forms';
import { Card, CardContent, Typography, TextField, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

const Profile = () => {
  const {state, dispatch } = useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useInput(state.user.name);
  const [popupOpen, setOpen] = useState(false);

  function saveChanges() {
    if (name !== state.user.name) {
      fetch(`${process.env.REACT_APP_API}/api/user`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth'),
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          name: name,
        }),
      }).then((response) => {
        return response.json();
      }).then((json) => {
        dispatch({type: LOGIN, user: json});
        setEditing(false);
        setOpen(true);
      });
    } else {
      setEditing(false);
    }
  }

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return <Card>
    <CardContent>
      {!editing ? <Fragment>
        <Typography variant='body1'>
      Your profile info.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setEditing(true)}>Edit profile</Button>
      </Fragment> :
        <Fragment>
          <Typography variant='body1'>Edit info:</Typography>
          <form autoComplete="off">
            <TextField
              autoComplete="off"
              id="name"
              label="Name"
              value={name}
              onChange={setName}
              margin="normal"
              variant="outlined"
            />
          </form>
          <Button disabled={name.length === 0} variant="contained" color="primary" onClick={() => saveChanges()}>Save change</Button>
        </Fragment>}
    </CardContent>
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={popupOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      message="Profile updated"
    />
  </Card>;
};

export default Profile;

