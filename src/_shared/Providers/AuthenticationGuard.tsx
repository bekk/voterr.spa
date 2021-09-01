import React from 'react';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import AuthenticationLoader from '../Layout/AuthenticationLoader';

const AuthenticationGuard: React.FC = ({ children }) => {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      loadingComponent={AuthenticationLoader}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
};

AuthenticationGuard.displayName = "AuthenticationGuard";
export default AuthenticationGuard;