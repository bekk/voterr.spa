import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useMsal, useAccount } from '@azure/msal-react';

import FrontPage from './Frontpage/FrontPage';
import VotePage from './Vote/Pages/VotePage';
import ResultsPage from './Results/Pages/ResultsPage';
import Layout from './_shared/Layout/MainLayout';
import CandidatesProvider from "./_shared/Providers/CandidatesProvider";

const App: React.FC = () => {
  const { accounts, instance } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    if(account) {
      instance.setActiveAccount(account);
    }
  }, [instance, account]);

  return (
    <BrowserRouter>
      <CandidatesProvider>
        <Layout>
          <Switch>
            <Route path="/" exact component={FrontPage} />
            <Route path="/vote" component={VotePage} />
            <Route path="/results" component={ResultsPage} />
          </Switch>
        </Layout>
      </CandidatesProvider>
    </BrowserRouter>
  );
}

export default App;
