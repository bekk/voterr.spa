import React, { useContext, useEffect, useState } from 'react';

import CandidateVotes from '../../_shared/Models/CandidateVotes';

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

const ResultsPage: React.FC = () => {
  const [candidateResults, setCandidateResults] = useState<Array<CandidateVotes>>();
  const candidates = useContext(CandidatesContext);
  const classes = useStyles();

  const getCandidateNameFromId = (candidateId: number) => {
    return candidates.find((c) => c.id === candidateId)?.name ?? 'Ukjent';
  };

  useEffect(() => {
    votesHttpClient.get<Array<CandidateVotes>>('/api/votes/results').then((result) => setCandidateResults(result.data));
  }, []);

  return (
    <>
      <Typography variant="h1" className={classes.header}>
        Results
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candidate</TableCell>
            <TableCell>Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidateResults
            ?.sort((a, b) => (a.voteCount < b.voteCount ? 1 : -1))
            .map((vr) => (
              <TableRow key={vr.candidateId}>
                <TableCell>{getCandidateNameFromId(vr.candidateId)}</TableCell>
                <TableCell>{vr.voteCount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

ResultsPage.displayName = 'ResultsPage';
export default ResultsPage;