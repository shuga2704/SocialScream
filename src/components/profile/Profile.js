import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// MUI stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
// Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme
});

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  }
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  handleLogout = () => {
    this.props.logoutUser();
  }
  render() {
    const {
      classes,
      user: {
        credentials: {
          handle,
          createdAt,
          imageUrl,
          bio,
          website,
          location,
        },
        loading,
        authenticated
      },
    } = this.props;

    let profileMarkup = !loading
      ? (authenticated
        ? (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img
                  className="profile-image"
                  src={imageUrl}
                  alt='Profile'
                />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <MyButton
                  tip="Edit profile picture"
                  onClick={this.handleEditPicture}
                  btnClassName="button">
                  <EditIcon color="primary" />
                </MyButton>
              </div>
              <hr />
              <div className="profile-details">
                <MuiLink
                  component={Link}
                  to={`/users/${handle}`}
                  color="primary"
                  variant="h5"
                >
                  @{handle}
                </MuiLink>
                <hr />
                {bio && <Typography variant="body2">{bio}</Typography>}
                <hr />
                {location && (
                  <>
                    <LocationOn color="primary" /> <span>{location}</span>
                    <hr />
                  </>
                )}
                {website && (
                  <>
                    <LinkIcon color="primary" />
                    <a href={website} targeet="_blank" rel="noopener norederrer">
                      {''}{website}
                    </a>
                    <hr />
                  </>
                )}
                <CalendarToday color="primary" />{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
              </div>
              <div className="profile-buttons">
                <EditDetails />
                <Button
                  variant="contained"
                  color="default"
                  onClick={this.handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </Paper>
        )
        : (
          <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
              No profile found, please login again
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/login">
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/signup">
                  Signup
                </Button>
              </div>
            </Typography>
          </Paper>
        ))
      : (<ProfileSkeleton />)

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
