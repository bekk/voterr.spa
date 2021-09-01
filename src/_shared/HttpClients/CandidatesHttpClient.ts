import axios from 'axios';
import msalInstance from '../Msal/MsalInstance';

const apiUrl = process.env.REACT_APP_CANDIDATES_API_URL as string;
export const requiredScopesForCandidates = ['api://voterr.candidates/candidates.read'];

const candidatesHttpClient = axios.create({
  baseURL: apiUrl,
});

candidatesHttpClient.interceptors.request.use(async (config) => {
  const account = msalInstance.getActiveAccount();

  let tokenData;
  try {
    tokenData = await msalInstance.acquireTokenSilent({
      scopes: requiredScopesForCandidates,
      account: account ?? undefined,
    });
  } catch (exception) {
    console.log({ exception });
    tokenData = await msalInstance.acquireTokenPopup({
      scopes: requiredScopesForCandidates,
      account: account ?? undefined,
    });
  }

  config.headers.Authorization = `Bearer ${tokenData.accessToken}`;

  return config;
});

export default candidatesHttpClient;
