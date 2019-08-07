export default {
  palette: {
    primary: {
      light: '#43a047',
      main: '#388e3c',
      dark: '#2e7d32',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ef5350',
      main: '#f44336',
      dark: '#e53935',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: 'center'
  },
  loginIcon: {
    width: 80,
    margin: '15px auto'
  },
  pageTitle: {
    margin: '10px auto'
  },
  textField: {
    margin: '8x auto'
  },
  button: {
    margin: '25px auto 15px auto',
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    margin: '15px 0 0 0'
  },
  progress: {
    position: 'absolute'
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid regba(0,0,0,0.1)',
    marginBottom: 20
  },
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 150,
      height: 150,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#388e3c'
      }
    },
    '& .profile-buttons': {
      textAlign: 'center',
      padding: "20px 0 5px 0",
      '& button': {
        margin: '0 5px'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
}