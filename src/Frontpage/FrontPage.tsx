import React from 'react';
import Typography from "@material-ui/core/Typography";

const FrontPage: React.FC = () => {

  return (
      <>
        <Typography variant="h3">
          Welcome to Voterr
        </Typography>
        <Typography variant="body1">
          This is a demo application that is used to demonstrate how modern authentication works using MSAL, Dotnet and React.
          You might not be able to sign in to this application if MPN is not configured in Azure or you are not an admin that may grant access to this application to your Azure AD.
        </Typography>
      </>

  );
};

FrontPage.displayName = "FrontPage";
export default FrontPage;