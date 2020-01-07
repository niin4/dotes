import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LoginMenu from '../components/LoginMenu';

function Header() {
  return <Grid container justify="space-between">
    <Grid item>
      <CardContent>
        <Typography variant="h4">Dungeon Notes</Typography>
      </CardContent>
    </Grid>
    <Grid item>
      <CardContent>
        <LoginMenu />
      </CardContent>
    </Grid>
  </Grid>;
}

export default Header;
