import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';

import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {
  Link,
} from 'react-router-dom';

const StyledAppBar = withStyles({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})(AppBar);

const StyledInput = withStyles({
  root: {
    position: 'absolute',
    right: '0',
  }
})(InputBase);

const DiceIcon = withStyles({
  label: {
    width: '30px',
    height: '30px',
    fontSize: '1.3em',
    marginBottom: '5px',
    transform: 'scale(-1, 1)',
  },
})(IconButton);

const TopMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  return <div>
    <StyledAppBar position="static">
      <Link to="/"><Button>Home</Button></Link>
      <Link to="/notes"><Button>Notes</Button></Link>
      <Link to="/journal"><Button>Journal</Button></Link>
      <DiceIcon aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label="Add">
          &#9998;
      </DiceIcon>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>New Note</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>New Journal Entry</MenuItem>

      </Menu>
      <StyledInput
        placeholder="Search…"
      />
    </StyledAppBar>

  </div>;
};

export default TopMenu;
