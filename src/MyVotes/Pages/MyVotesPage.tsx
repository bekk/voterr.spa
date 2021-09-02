import React, { useContext, useEffect, useState } from 'react';

import Vote from '../../_shared/Models/Vote';

import Typography from '@material-ui/core/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import votesHttpClient from '../../_shared/HttpClients/VotesHttpClient';
import CandidatesContext from '../../_shared/Contexts/CandidatesContext';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '28px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
}));

const MyVotesPage: React.FC = () => {
  const [myVotes, setMyVotes] = useState<Array<Vote>>([]);
  const candidates = useContext(CandidatesContext);
  const classes = useStyles();

  const getCandidateNameFromId = (candidateId: number) => {
    return candidates.find((c) => c.id === candidateId)?.name ?? 'Ukjent';
  };

  useEffect(() => {
    votesHttpClient.get<Array<Vote>>('/api/votes/my').then((result) => setMyVotes(result.data));
  }, []);

  return (
    <>
      <Typography variant="h1" className={classes.header}>
        My votes
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Candidate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myVotes
            .map(vote => ({...vote, timestamp: new Date(vote.timestamp)}))
            ?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
            .map((vote) => (
              <TableRow key={vote.id}>
                <TableCell>{vote.timestamp.toISOString()}</TableCell>
                <TableCell>{getCandidateNameFromId(vote.candidateId)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

MyVotesPage.displayName = 'MyVotesPage';
export default MyVotesPage;