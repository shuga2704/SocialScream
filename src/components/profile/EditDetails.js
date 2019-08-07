import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme
})

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true
    })
    this.mapUserDetailsToState(this.props.credentials);
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    }
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    })
  }
  componentDidMount() {
    this.mapUserDetailsToState(this.props.credentials);
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleOpen}>
          Edit
              </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth />
            </form>
          </DialogContent>
          <DialogContent>
            <Button
              onClick={this.handleClose}
              color="primary">
              Cancel
              </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary">
              Submit
              </Button>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
})

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
