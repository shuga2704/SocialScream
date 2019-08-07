import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import ScreamSkeleton from '../util/ScreamSkeleton';
// Redux stuff
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import { homedir } from 'os';

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
        <ScreamSkeleton />
      );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

homedir.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data
})


export default connect(mapStateToProps, { getScreams })(Home);

