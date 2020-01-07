import React from 'react';
import Button from '@material-ui/core/Button';


const LoginMenu = () => <div>
  <Button color="primary" href="/auth/google">Login</Button>
  <Button color="primary" href="/auth/logout">Logout</Button>
</div>;

export default LoginMenu;
