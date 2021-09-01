import React, {useEffect, useState} from 'react';

import candidatesHttpClient from "../HttpClients/CandidatesHttpClient";

import CandidatesContext from '../Contexts/CandidatesContext';
import Candidate from '../Models/Candidate';

const CandidatesProvider: React.FC = ({ children }) => {
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);

  const fetchCandidates = async () => {
      const result = await candidatesHttpClient.get<Array<Candidate>>("/api/candidates");

      setCandidates(result.data);
  }

  useEffect(() => {
      fetchCandidates();
  }, []);

  return <CandidatesContext.Provider value={candidates}>{children}</CandidatesContext.Provider>;
};

export default CandidatesProvider;
