import axios from 'axios';
import msalInstance from '../Msal/MsalInstance';

const apiUrl = process.env.REACT_APP_VOTEMEISTER_API_URL as string;
const requiredScopes = [
  "api://votemeister-2021-api/candidates.read",
  "api://votemeister-2021-api/results.read",
  "api://votemeister-2021-api/votes.cast",
  "api://votemeister-2021-api/votes.read",
];

const votemeisterHttpClient = axios.create({
  baseURL: apiUrl
});

votemeisterHttpClient.interceptors.request.use(async config => {
  const account = msalInstance.getActiveAccount();

  let tokenData;
  try {
    tokenData = await msalInstance.acquireTokenSilent({scopes: requiredScopes, account: account ?? undefined});
  }
  catch(exception) {
    console.log({exception});
    tokenData = await msalInstance.acquireTokenPopup({scopes: requiredScopes, account: account ?? undefined});
  }

  config.headers.Authorization = `Bearer ${tokenData.accessToken}`;

  return config;
});


export default votemeisterHttpClient;