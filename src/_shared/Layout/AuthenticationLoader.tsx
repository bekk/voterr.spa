import React from 'react';

import Box from '@material-ui/core/Box';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  loader: {
    marginTop: "20%"
  }
}))

const AuthenticationLoader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.wrapper}>
        <CircularProgress className={classes.loader} size="20rem" thickness={2} />
      </Box>
      <Backdrop open={true} />
    </>
  )
};

AuthenticationLoader.displayName = "AuthenticationLoader";
export default AuthenticationLoader;