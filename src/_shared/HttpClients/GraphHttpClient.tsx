import axios from 'axios';
import msalInstance from '../Msal/MsalInstance';

const apiUrl = process.env.REACT_APP_GRAPH_API_URL as string;
export const requiredScopesForGraph = ['https://graph.microsoft.com/user.read'];

const graphHttpClient = axios.create({
  baseURL: apiUrl,
});

graphHttpClient.interceptors.request.use(async (config) => {
  const account = msalInstance.getActiveAccount();

  let tokenData;
  try {
    tokenData = await msalInstance.acquireTokenSilent({
      scopes: requiredScopesForGraph,
      account: account ?? undefined,
    });
  } catch (exception) {
    tokenData = await msalInstance.acquireTokenPopup({ scopes: requiredScopesForGraph, account: account ?? undefined });
  }

  config.headers.Authorization = `Bearer ${tokenData.accessToken}`;

  return config;
});

export default graphHttpClient;
