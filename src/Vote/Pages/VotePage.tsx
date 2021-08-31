import React, { useEffect, useState } from 'react';

import votemeisterHttpClient from '../../_shared/HttpClients/VotemeisterHttpClient';
import Candidate from '../../_shared/Models/Candidate';
import VoteCard from '../Components/VoteCard';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '28px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5)
  },
}));

const VotePage: React.FC = () => {
  const [candidates, setCandidates] = useState<Array<Candidate>>();
  const classes = useStyles();

  useEffect(() => {
    votemeisterHttpClient.get<Array<Candidate>>('/api/candidates').then((result) => setCandidates(result.data));
  }, []);

  return (
    <>
      <Typography variant="h1" className={classes.header}>
        Cast your vote
      </Typography>
      <Grid container spacing={2}>
        {candidates?.map((candidate) => (
          <Grid key={candidate.name} item xs={12} sm={4}>
            <VoteCard candidate={candidate} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

VotePage.displayName = 'VotePage';
export default VotePage;
