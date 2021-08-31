import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useMsal } from '@azure/msal-react';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 1.5),
  },
}));

const LoginButton: React.FC = () => {
  const classes = useStyles();
  const { instance } = useMsal();

  const handleOnClick = async () => {
    await instance.loginPopup();
  };

  return (
    <Button color="primary" onClick={handleOnClick} variant="outlined" className={classes.button}>
      Login
    </Button>
  );
};

LoginButton.displayName = "LoginButton";
export default LoginButton;