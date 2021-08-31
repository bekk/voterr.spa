import React, { useEffect, useState } from 'react';

import VoteResult from '../../_shared/Models/VoteResult';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import votemeisterHttpClient from '../../_shared/HttpClients/VotemeisterHttpClient';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '28px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5)
  },
}));

const ResultsPage: React.FC = () => {
  const [voteResults, setVoteResults] = useState<Array<VoteResult>>();
  const classes = useStyles();

  useEffect(() => {
    votemeisterHttpClient.get<Array<VoteResult>>("/api/results")
      .then(result => setVoteResults(result.data));
  }, []);

  return (
    <>
      <Typography variant="h1" className={classes.header}>
        Results
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Candidate
            </TableCell>
            <TableCell>
              Votes
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {voteResults?.map(vr => (
            <TableRow key={vr.candidateName}>
              <TableCell>
                {vr.candidateName}
              </TableCell>
              <TableCell>
                {vr.votes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

ResultsPage.displayName = "ResultsPage";
export default ResultsPage;