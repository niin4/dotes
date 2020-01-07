import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Typography from '@material-ui/core/Typography';


// THEME
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

const render = (Component) => {
  ReactDOM.render(<MuiThemeProvider theme={theme}>
    <Typography component="div">
      <Component />
    </Typography>
  </MuiThemeProvider>,
  document.getElementById('root'),
  );
};

// Render once
render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
