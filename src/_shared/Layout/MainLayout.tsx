import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import LoginButton from './components/LoginButton';

import { makeStyles } from '@material-ui/core/styles';
import ProfileInfo from './components/ProfileInfo';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Votemeister 2021
          </Typography>
          <nav>
            <Link component={RouterLink} to="/vote" variant="button" color="textPrimary" className={classes.link}>
              Vote
            </Link>
            <Link component={RouterLink} to="/results" variant="button" color="textPrimary" className={classes.link}>
              Results
            </Link>
            <Link component={RouterLink} to="/myVotes" variant="button" color="textPrimary" className={classes.link}>
              My votes
            </Link>
          </nav>
          <AuthenticatedTemplate>
            <ProfileInfo />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <LoginButton />
          </UnauthenticatedTemplate>

        </Toolbar>
      </AppBar>

      <Container maxWidth="md" component="main">
        <>
          {children}
        </>
      </Container>

      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
              Votemeister
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

Layout.displayName = 'Layout';
export default Layout;
