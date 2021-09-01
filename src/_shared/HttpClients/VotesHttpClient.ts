import axios from 'axios';
import msalInstance from '../Msal/MsalInstance';

const apiUrl = process.env.REACT_APP_VOTES_API_URL as string;
const requiredScopes = [
    "api://voterr.votes/votes.readMy",
    "api://voterr.votes/votes.cast",
    "api://voterr.votes/votes.readResult"
];

const votesHttpClient = axios.create({
    baseURL: apiUrl
});

votesHttpClient.interceptors.request.use(async config => {
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


export default votesHttpClient;