import React, { useEffect, useState } from 'react';

import graphHttpClient from '../../HttpClients/GraphHttpClient';

import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { makeStyles } from '@material-ui/core/styles';
import { useMsal } from '@azure/msal-react';

interface IProfileInfo {
  displayName: string;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 1.5),
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

const ProfileInfo: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>();
  const classes = useStyles();
  const {instance} = useMsal();

  const handleOnClick = async () => {
    await instance.logout();
  }

  useEffect(() => {
    graphHttpClient.get<IProfileInfo>("/v1.0/me")
      .then(response => {
        setProfileInfo(response.data);
      });
  }, []);

  if(!profileInfo) {
    return null;
  }

  return (
    <Button color="primary" onClick={handleOnClick} variant="outlined" className={classes.button}>
      <ExitToAppIcon className={classes.icon} /> {profileInfo.displayName}
    </Button>
  );
};

ProfileInfo.displayName = "ProfileInfo";
export default ProfileInfo;