import React from 'react';
import { Grid } from 'react-bootstrap';

import RoutesContainer from './containers/RoutesContainer';
import Navbar from './components/Navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Grid fluid={true}>
          <RoutesContainer {...this.props} />
        </Grid>
      </div>
    );
  }
}

export default App;
