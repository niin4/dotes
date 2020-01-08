import React from 'react';

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

import RootStore from './store/RootStore';
import { observer } from 'mobx-react';

const Home = () => <Card><CardContent>Home</CardContent></Card>;
const Notes = () => <Card><CardContent>Notes</CardContent></Card>;
const Journal = () => <Card><CardContent>Journal</CardContent></Card>;

@observer
class App extends React.Component {
  componentDidMount(){
    const store = new RootStore();
    console.log(store.user);
  }
  render() {
    return <Router>
      <Container maxWidth="md">
        <Grid container>
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
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/notes'>
                <Notes />
              </Route>
              <Route path='/journal'>
                <Journal />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </Router>;
  }
}

export default App;
