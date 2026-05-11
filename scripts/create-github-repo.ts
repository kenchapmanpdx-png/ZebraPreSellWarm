import { Octokit } from '@octokit/rest'

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function createRepo() {
  const octokit = await getUncachableGitHubClient();
  
  try {
    const response = await octokit.repos.createForAuthenticatedUser({
      name: 'ZebraPreSellWarm',
      description: 'ZebraWell - Clinical-grade wellness supplements for rare conditions (EDS, POTS, MCAS)',
      private: false,
      auto_init: false
    });
    
    console.log('Repository created successfully!');
    console.log('Repository URL:', response.data.html_url);
    console.log('Clone URL:', response.data.clone_url);
    return response.data;
  } catch (error: any) {
    if (error.status === 422) {
      console.log('Repository may already exist. Fetching existing repo...');
      const user = await octokit.users.getAuthenticated();
      const repo = await octokit.repos.get({
        owner: user.data.login,
        repo: 'ZebraPreSellWarm'
      });
      console.log('Repository URL:', repo.data.html_url);
      console.log('Clone URL:', repo.data.clone_url);
      return repo.data;
    }
    throw error;
  }
}

createRepo().catch(console.error);
